from django.urls import path
from .views import PaymobPaymentView, PaymentCallbackView

urlpatterns = [
    path('api/paymob/payment/', PaymobPaymentView.as_view(), name='paymob-payment'),
    path('api/paymob/callback/', PaymentCallbackView.as_view(), name='paymob-callback'),
]
