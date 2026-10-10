from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from api.views import api_overview

urlpatterns = [
    path('', api_overview, name='root-overview'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
