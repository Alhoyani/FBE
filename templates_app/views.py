from rest_framework import generics
from .models import Category, Template
from .serializers import CategorySerializer, TemplateSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

# Create your views here.

class CategoryViewSet(generics.ListAPIView):
    queryset = Category.objects.filter(available=True)
    serializer_class = CategorySerializer


class TemplateViewSet(generics.ListAPIView):
    queryset = Template.objects.select_related('category').all()
    serializer_class = TemplateSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']