from rest_framework import serializers
from .models import Template, Category

# Create your serializers here.

class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ['id', 'name', 'name_ar', 'description', 'description_ar', 'image', 'category', 'created_at', 'updated_at']

class TemplateHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ['id', 'image']

class CategorySerializer(serializers.ModelSerializer):
    # templates = TemplateSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'name_ar', 'icon']
