from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import SiteConfigurationSerializer
from .models import SiteConfiguration


class SiteConfigurationView(APIView):

    def get(self, request, **kwargs):

        serializer = SiteConfigurationSerializer(
            SiteConfiguration.objects.get())
        return Response(serializer.data)