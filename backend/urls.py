"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="To Be Expert",
        default_version="v1",
        description="To Be Expert API",
        # terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="mahmoudaboelnaga392@gmail.com"),
        license=openapi.License(name="To Be Expert"),
    ),
    public = True,
    permission_classes = (permissions.AllowAny,)
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', include('accounts.urls')),
    path('', include('templates_app.urls')),
    path('', include('resume.urls')),
    path('', include('home.urls')),
    path('', include('payment.urls')),

    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'), # Collection Document JSON
    path('', schema_view.with_ui('swagger', cache_timeout=0), name="schema-swagger-ui"), # Swagger Document
    # path('', schema_view.with_ui('redoc', cache_timeout=0), name="schema-redoc-ui"), # Redoc Document

    path('__debug__/', include('debug_toolbar.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)