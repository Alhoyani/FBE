from rest_framework import serializers
from . import models
import random
from datetime import timedelta
from django.utils.timezone import now

# Create your serializers here.

class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def create_otp(self, user):
        """
        Creates an OTP for the given user.

        :param user: The user to create the OTP for
        :type user: :class:`accounts.models.User`
        :return: The OTP code
        :rtype: str
        """
        otp_code = str(random.randint(10000, 99999))
        expiration_time = now() + timedelta(minutes=10)
        models.OTP.objects.create(user=user, otp=otp_code, expires_at=expiration_time)
        return otp_code
    
class OTPSerializer(serializers.Serializer):
    otp = serializers.CharField(max_length=6)
    email = serializers.EmailField()

    def validate(self, attrs):
        """
        Validates the provided OTP and email combination.

        Args:
            attrs (dict): A dictionary containing 'otp' and 'email' for validation.

        Raises:
            serializers.ValidationError: If the user does not exist, the OTP is invalid,
            expired, or has already been used.

        Returns:
            dict: A dictionary containing the validated 'user' and 'otp_instance'.
        """
        otp_code = attrs.get('otp')
        email = attrs.get('email')
        user = models.User.objects.filter(email=email).first()

        if not user:
            raise serializers.ValidationError({"details": "User does not exist."})

        otp_instance = models.OTP.objects.filter(user=user, otp=otp_code).first()
        if not otp_instance:
            raise serializers.ValidationError({"details": "Invalid OTP."})
        elif otp_instance.is_expired():
            raise serializers.ValidationError({"details": "OTP is expired."})
        elif otp_instance.is_verified:
            raise serializers.ValidationError({"details": f"The OTP {otp_code} has already been used."})

        return {"user": user, "otp_instance": otp_instance}
