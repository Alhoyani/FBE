from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _

# Register your managers here.

class UserManager(BaseUserManager):
    """
        Custom user model manager where email is the unique identifiers for authentication instead of usernames.
    """
    def create_user(self, email, password=None, **extra_fields):
        """
            Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if extra_fields.get('is_superuser'):
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save()
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        """
            Create and save a SuperUser with the given email.
        """
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))

        return self.create_user(email, password, **extra_fields)