from django.urls import path
from rest_framework_simplejwt.views import (
    TokenVerifyView,
    TokenRefreshView,
    TokenBlacklistView,
)
from .views import SendOTPView, VerifyOTPView, GoogleLoginView

urlpatterns = [
    path("api/auth/google/", GoogleLoginView.as_view(), name="google_login"),
    path("api/auth/send-otp/", SendOTPView.as_view(), name="send-otp"),
    path("api/auth/validate-otp/", VerifyOTPView.as_view(), name="validate-otp"),

    path('api/auth/logout/', TokenBlacklistView.as_view(), name='token_blacklist'), 
    path('api/auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]