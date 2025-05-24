from rest_framework import serializers
from . import models
from templates_app.serializers import TemplateHomeSerializer
# Create your serializers here.


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Feature
        fields = '__all__'

class FaqSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Faq
        fields = '__all__'

class HomeSerializer(serializers.Serializer):
    features = FeatureSerializer(many=True)
    faqs = FaqSerializer(many=True)
    templates = TemplateHomeSerializer(many=True)