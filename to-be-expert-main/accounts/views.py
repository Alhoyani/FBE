from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from . import serializers, models
from rest_framework_simplejwt.tokens import RefreshToken
from .service import send_email
from django.conf import settings
from google.oauth2 import id_token
from google.auth.transport import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.conf import settings
from rest_framework import status
import base64
import json
import google.auth
from google.auth.transport.requests import Request
from google.auth.exceptions import GoogleAuthError

# Create your views here.

def generate_response(email, refresh_token, message):
    return {
        "access_token": str(refresh_token.access_token),
        "refresh_token": str(refresh_token),
        "user": {
            "email": email
        },
        "message": message,
    }

class GoogleLoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        token = request.data.get('code')
        if not token:
            return Response({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verify the token with Google
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY)

            # Get user info from Google token
            email = idinfo.get('email')

            # Check if the user exists, otherwise create a new one
            user, created = models.User.objects.get_or_create(email=email)

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response(generate_response(email, refresh, "Login successful"), status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({'error': 'Invalid token', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except GoogleAuthError as e:
            return Response({'error': 'Google authentication error', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'An unexpected error occurred', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SendOTPView(APIView):
    Authentication_classes = []
    permission_classes = []

    def send_mail(self, receiver_email, otp):
        """
        Sends a verification OTP to the given email address.

        Args:
            email (str): The email address to send the OTP to.
            otp (str): The OTP to send.
        """
        send_email.delay(receiver_email, otp)

    def post(self, request):
        """
        Sends a verification OTP to the given email address.

        Args:
            request (Request): The request containing the email address to send the OTP to.

        Returns:
            Response: A response containing the OTP and a success message, or an error response if the email address is invalid.
        """
        serializer = serializers.EmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user, created = models.User.objects.get_or_create(email=email)
            otp = serializer.create_otp(user)

            self.send_mail(email, otp)

            return Response({"details": f"OTP sent successfully to your email."}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        """
        Verifies an OTP and returns tokens upon successful validation.

        Args:
            request (Request): The request containing the OTP and email.

        Returns:
            Response: A unified response containing the refresh and access tokens.
        """
        serializer = serializers.OTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        otp_instance = serializer.validated_data['otp_instance']
        otp_instance.is_verified = True
        otp_instance.save()

        user = serializer.validated_data['user']
        refresh_token = RefreshToken.for_user(user)

        return Response(
            generate_response(
                email=user.email,
                refresh_token=refresh_token,
                message="OTP verification successful"
            ),
            status=status.HTTP_200_OK
        )
