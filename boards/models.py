from django.db import models
from django.core.files.base import ContentFile
from io import BytesIO
from PIL import Image
import os


class Board(models.Model):

    name = models.CharField(max_length=120)
    slug = models.CharField(max_length=10)
    description = models.TextField(max_length=1000)

    def __str__(self):
        return self.name

class Post(models.Model):

    post_number = models.IntegerField()
    title = models.CharField(max_length=120, blank=True)
    username = models.CharField(max_length=120)
    email = models.CharField(max_length=120, blank=True)
    file = models.FileField(null=True, blank=True, upload_to="src")
    thumbnail = models.ImageField(null=True, blank=True, upload_to="thumb")
    message = models.TextField(max_length=2000, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True) 
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='replyes', null=True, blank=True)
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name='posts')
    

    def create_img_thumbnail(self):

        if not self.file:
            return

        THUMBNAIL_SIZE = (150, 150)

        image = Image.open(self.file)
        image.thumbnail(THUMBNAIL_SIZE, Image.ANTIALIAS)

        thumb_name, thumb_extension = os.path.splitext(self.file.name)

        thumb_extension = thumb_extension.lower()
        thumb_filename = thumb_name + thumb_extension

        if thumb_extension in ['.jpg', '.jpeg']:
            FTYPE = 'JPEG'
        elif thumb_extension == '.gif':
            FTYPE = 'GIF'
        elif thumb_extension == '.png':
            FTYPE = 'PNG'
        else:
            return False

        temp_thumb = BytesIO()
        image.save(temp_thumb, FTYPE)
        temp_thumb.seek(0)
        self.thumbnail.save(thumb_filename, ContentFile(temp_thumb.read()), save=False)
        temp_thumb.close()
        return True

    def save(self, *args, **kwargs):

        if not self.id:
            self.create_img_thumbnail()

        return super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.id)

    





