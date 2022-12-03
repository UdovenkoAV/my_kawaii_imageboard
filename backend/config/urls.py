from django.urls import path
from .views import SiteConfigurationView

urlpatterns = [
    path('', SiteConfigurationView.as_view(), name='Config'),
]
