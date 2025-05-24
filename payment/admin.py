from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'transaction', 'created_at')
    list_filter = ('created_at',)
    readonly_fields = ('order', 'transaction', 'created_at')
