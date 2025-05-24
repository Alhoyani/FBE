from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResumeBuilderView, GenerateResumePdfView, SectionsListView

urlpatterns = [
    path('api/sections/', SectionsListView.as_view(), name='sections'),
    path('api/resume-builder/', ResumeBuilderView.as_view(), name='resume_builder'),
    path('api/resume-builder/<int:resume_id>/', ResumeBuilderView.as_view(), name='resume_builder_update'),
    path('api/resume-builder/download/hmac=<str:hmac>', GenerateResumePdfView.as_view(), name='generate_resume_pdf'),
]
