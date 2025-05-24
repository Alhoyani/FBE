from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from templates_app.models import Template

# Create your views here.

class HomeView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        features = models.Feature.objects.all()
        faqs = models.Faq.objects.all()
        templates = Template.objects.all()

        data = {
            'features': features,
            'faqs': faqs,
            'templates' : templates
        }

        serializer = serializers.HomeSerializer(data)
        return Response(serializer.data)