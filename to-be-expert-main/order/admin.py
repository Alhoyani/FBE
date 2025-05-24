from django.contrib import admin
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.forms import ModelForm
from . import models

# Register your models here.

class MenuForm(ModelForm):
    class Meta:
        model = models.Menu
        fields = '__all__'

    def clean(self):
        if not self.instance.pk and models.Menu.objects.exists():
            raise ValidationError("Only one Menu instance is allowed.")
        return super().clean()

class MenuAdmin(admin.ModelAdmin):
    form = MenuForm

@admin.register(models.Menu)
class MenuAdmin(admin.ModelAdmin):
    form = MenuForm
    readonly_fields = ('quantity',)

admin.site.register(models.Order)
