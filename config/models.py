from django.db import models
from solo.models import SingletonModel

class SiteConfiguration(SingletonModel):

    site_name = models.CharField(max_length=256, default='My kawaii imageboard')
    welcome_message = models.TextField(max_length=2048, default='Hello world!')
    max_upload_file_size = models.IntegerField(default=20971520)

    def __str__(self):
        return "Site configuration"

