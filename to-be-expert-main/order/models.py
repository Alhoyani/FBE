from django.db import models
from django.core.exceptions import ValidationError
from resume.models import Resume

# Create your models here.

class Menu(models.Model):
    price = models.PositiveIntegerField(help_text="Price of the product.")
    vat = models.PositiveIntegerField(default=0, help_text="Value Added Tax (percentage).")
    quantity = models.PositiveIntegerField(default=1, help_text="Quantity of the product.")

    def save(self, *args, **kwargs):
        if not self.pk and Menu.objects.exists():
            raise ValidationError("Only one Menu instance is allowed.")
        super().save(*args, **kwargs)

    def __str__(self):
        return "Menu"

class Order(models.Model):
    price = models.PositiveIntegerField(help_text="Price of the product.")
    vat = models.PositiveIntegerField(default=0, help_text="Value Added Tax (percentage).")
    quantity = models.PositiveIntegerField(default=1, help_text="Quantity of the product.")
    resume = models.OneToOneField(Resume, on_delete=models.CASCADE, help_text="The resume associated with the order.")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(
            max_length=20,
            choices=[
                ('PROCESSING', 'Processing'),
                ('COMPLETED', 'Completed'),
                ('CANCELLED', 'Cancelled'),
            ],
            default='PROCESSING',
        )
    
    def get_vat_amount(self):
        """Calculate the VAT amount based on price and VAT percentage."""
        return self.price * self.vat / 100

    def calculate_subtotal(self):
        """Calculate the subtotal of the order."""
        return self.quantity * self.price
    
    def calculate_vat(self):
        """Calculate the VAT amount."""
        return self.get_vat_amount() * self.quantity
    
    def calculate_total(self):
        """Calculate the total cost including VAT."""
        subtotal = self.calculate_subtotal()
        vat = self.get_vat_amount()
        return subtotal + (vat * self.quantity)

    def __str__(self):
        return f"Order with ID: {self.id} of Resume with ID: {self.resume.id}"