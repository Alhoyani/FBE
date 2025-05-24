from django.contrib import admin
from .models import Template, Category
# Register your models here.


@admin.register(Template)
class TemplateAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'created_at']
    list_filter = ['category']

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'name_ar', 'available', 'perority']
    list_editable = ['available', 'perority']
    list_filter = ['available']
