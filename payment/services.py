import requests
import json
from django.conf import settings
from order.models import Menu
from . import options

# Create your services here.

class PaymobService:
    """Service to manage Paymob integration for payments."""
    
    def __init__(self):
        self.base_url = settings.PAYMOB_BASE_URL
        self.secret_key = settings.PAYMOB_SECRET_KEY
        self.public_key = settings.PAYMOB_PUBLIC_KEY
        self.payment_methods = options.PAYMOB_PAYMENT_METHODS
        self.notification_url = settings.PAYMOB_NOTIFICATION_URL
        self.redirection_url = settings.PAYMOB_REDIRECTION_URL

    def find_integration_id_by_code(self, code: str):
        return next((method["integration_id"] for method in self.payment_methods if method['code'] == code and method['active']), None)

    def get_all_active_payment_methods(self, domain: str = None):
        return [{"code": method["code"], "name": method["name"], "icon": f"{domain}{method["icon"]}"} for method in self.payment_methods if method['active']]
    
    def get_paymeny_info(self, order):
        return {
            "quantity": order.quantity,
            "product": "Resume",
            "price": order.price,
            "currency": "SAR",
            "vat_percentage": f"{order.vat}%",
            "vat_amount": order.calculate_vat(),
            "total_amount": order.calculate_total()
        }

    def intention(self, code, order):
        """The Intention API allows you to create a payment request by providing all the required parameters."""
        url = f"{self.base_url}/v1/intention"
        menu = Menu.objects.first()
        amount_cents = int(menu.quantity * (menu.price + (menu.price * menu.vat / 100))) * 100

        payload = json.dumps(
            {
                "amount": amount_cents,
                "currency": "SAR",
                "payment_methods": [
                    self.find_integration_id_by_code(code)
                ],
                "items": [
                    {
                    "name": order.id,
                    "amount": amount_cents,
                    "description": f"Order {order.id} of Resume with ID: {order.resume.id} for {order.resume.full_name}",
                    "quantity": 1
                    }
                ],
                "billing_data": {
                    "first_name": order.resume.full_name.split(" ")[0] or "Khalifah",
                    "last_name": order.resume.full_name.split(" ")[1] or "Alsadah",
                    "phone_number": order.resume.phone or "+966545650813",
                    "country": "saudi arabia",
                    "email": order.resume.email or "khalifah@tobe.expert",
                },
                "notification_url": self.notification_url,
                "redirection_url": self.redirection_url
            }
        )

        headers = {
            'Authorization': f'Token {self.secret_key}',
            'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload).json()

        return response.get("client_secret")

    def get_checkout_url(self, client_secret):
        """Gets the checkout URL for a specific payment token."""
        return f"{self.base_url}/unifiedcheckout/?publicKey={self.public_key}&clientSecret={client_secret}"

    def create_payment(self, code:str, order:dict):
        """Orchestrates the payment process."""
        try:
            # Step 1: Create Intention
            client_secret = self.intention(code, order)

            # Step 2: Create checkout URL
            checkout_url = self.get_checkout_url(client_secret)

            return checkout_url

        except requests.exceptions.RequestException as e:
            raise Exception(f"Error in Paymob payment process: {e}")
