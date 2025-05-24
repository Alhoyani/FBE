from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, TemplateViewSet

urlpatterns = [
    path('api/categories/', CategoryViewSet.as_view(), name='categories'),
    path('api/templates/', TemplateViewSet.as_view(), name='templates'),
]
