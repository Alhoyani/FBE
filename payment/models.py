from django.db import models
from order.models import Order

# Create your models here.

class Payment(models.Model):
    order = models.ForeignKey('order.Order', on_delete=models.CASCADE, related_name='payments')
    hmac = models.TextField()
    is_successful = models.BooleanField(default=False)
    transaction = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment for {self.order.id}"