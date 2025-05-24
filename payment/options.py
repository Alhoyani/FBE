from django.templatetags.static import static

PAYMOB_PAYMENT_METHODS = [
    {
        "integration_id": 7877, 
        "code": "test", 
        "name": "Test", 
        "active": False, 
        "periority": 1,
        "icon": static("icons/credit-card.png")
    }, {
        "integration_id": 7968, 
        "code": "credit_card", 
        "name": "Credit Card", 
        "active": True, 
        "periority": 2,
        "icon": static("icons/credit-card.png")
    }, {
        "integration_id": 7967, 
        "code": "stc_pay", 
        "name": "STC Pay", 
        "active": False, 
        "periority": 3,
        "icon": static("icons/wallet.png")
    }, {
        "integration_id": 7966, 
        "code": "apple_pay", 
        "name": "Apple Pay", 
        "active": False, 
        "periority": 4,
        "icon": static("icons/apple-pay.png")
    }
]
