from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import PaymobService
from resume.models import Resume
from .models import Payment
from accounts.models import User
from django.core.exceptions import ObjectDoesNotExist
from order.models import Order
from .hmac_validator import HMACValidator

# Create your views here.

class PaymobPaymentView(APIView):
    service = PaymobService()
    
    def get(self, request):
        domain = request.scheme + "://" + request.get_host()
        user = request.user
        resume = Resume.objects.filter(user=user, is_purchased=False).last()
        try:
            order = Order.objects.get(resume=resume)
        except Order.DoesNotExist:
            raise ObjectDoesNotExist("Order not found")

        try:
            data = {
                "payment_methods": self.service.get_all_active_payment_methods(domain),
                "payment_info": self.service.get_paymeny_info(order)
            }
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request):
        try:
            code = request.query_params.get('code')
            if not code:
                return Response({"error": "Code is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            user = request.user
            resume = Resume.objects.filter(user=user, is_purchased=False).last()
            order = Order.objects.get(resume=resume)
            checkout_url = self.service.create_payment(code, order)

            return Response({"checkout_url": checkout_url}, status=status.HTTP_200_OK)
        except (ValueError, KeyError, TypeError, AttributeError, AssertionError, IndexError) as e:
            status_code = self.get_error_status_code(e)
            return Response({"error": str(e)}, status=status_code)
        except Exception as e:
            return Response({"error": "An unexpected error occurred : " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def get_error_status_code(exception):
        error_map = {
            ValueError: status.HTTP_400_BAD_REQUEST,
            KeyError: status.HTTP_401_UNAUTHORIZED,
            TypeError: status.HTTP_402_PAYMENT_REQUIRED,
            AttributeError: status.HTTP_403_FORBIDDEN,
            AssertionError: status.HTTP_404_NOT_FOUND,
            IndexError: status.HTTP_405_METHOD_NOT_ALLOWED,
        }
        return error_map.get(type(exception), status.HTTP_500_INTERNAL_SERVER_ERROR)

class PaymentCallbackView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        print("Data:", request.data)
        try:
            received_hmac = self.get_received_hmac(request)
            print("Received HMAC:", received_hmac)
            hmac_validator = HMACValidator(incoming_hmac=received_hmac, callback_dict=request.data)
            print("HMAC is valid:", hmac_validator.is_valid)

            if not hmac_validator.is_valid:
                return self.error_response('Invalid HMAC', status.HTTP_400_BAD_REQUEST)
            
            is_payment_successful = self.get_payment_status(request.data)
            print("Payment Status:", is_payment_successful)

            if is_payment_successful:
                user = self.get_user_from_email(request.data)
                print("User:", user)
                order_id = self.get_order_id(request.data)
                print("Order ID:", order_id)
                order = Order.objects.get(id=order_id)
                print("Order:", order)
                self.save_payment_data(request.data, is_payment_successful, received_hmac, order)
                print("Payment data saved successfully")
                self.update_order_status(order, "COMPLETED")
                print("Order status updated successfully")
                self.update_resume_purchased(order)
                print("Resume status updated successfully")
            else:
                self.update_order_status(user, "CANCELLED")
                print("Order status updated successfully")

            print("Payment data saved successfully")
            return Response({'message': 'HMAC is valid'}, status=status.HTTP_200_OK)

        except (ValueError, KeyError) as e:
            return self.error_response(str(e), status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return self.error_response('User not found for the provided email', status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return self.error_response('An unexpected error occurred: ' + str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_received_hmac(self, request):
        hmac_key = request.GET.get('hmac')
        if not hmac_key:
            raise ValueError('HMAC is missing')
        return hmac_key

    def get_user_from_email(self, data):
        email = data['obj']['order']['shipping_data']['email']
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise ObjectDoesNotExist("User not found for the provided email")

    def get_payment_status(self, data):
        return data['obj']['success']
    
    def get_order_id(self, data):
        return int(data['obj']['order']['items'][0]['name'])
    
    def save_payment_data(self, raw_data, is_payment_successful, hmac, order):
        try:
            Payment.objects.create(order=order, is_successful=is_payment_successful, transaction=raw_data, hmac=hmac)
            print("Payment data saved successfully")
        except KeyError as e:
            raise Exception(f"KeyError: {e}")
        except Exception as e:
            raise Exception(f"An unexpected error occurred: {e}")

    def update_order_status(self, order, status):
        try:
            order.status = status
            order.save()
        except Order.DoesNotExist:
            pass
    
    def update_resume_purchased(self, order):
        try:
            resume = Resume.objects.get(order=order)
            resume.is_purchased = True
            resume.save()
        except Resume.DoesNotExist:
            pass


    def error_response(self, message, status_code):
        return Response({'error': message}, status=status_code)
