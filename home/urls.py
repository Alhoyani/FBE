from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HomeView

urlpatterns = [
    path('api/home/', HomeView.as_view(), name='resume_builder'), 
]
