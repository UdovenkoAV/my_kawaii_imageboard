from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver 
from django.core.files.base import ContentFile
from django.core.exceptions import ObjectDoesNotExist
from io import BytesIO
from PIL import Image
import os
import re


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
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='replies', null=True, blank=True)
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name='posts')

    def formatPostLinks(self):

        match_list = re.findall(r">>\d+", self.message)

        if match_list:
            for string in match_list:
                post_num = string[2:]
                try:
                    linked_post = self.__class__.objects.get(post_number=post_num, board=self.board)
                except ObjectDoesNotExist:
                    continue
                if linked_post.parent:
                    self.message = self.message.replace(string, 
                            f'&gt;&gt;{post_num}#{linked_post.parent.post_number}')
                else:
                    self.message = self.message.replace(string, 
                            f'&gt;&gt;{post_num}#{post_num}')




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


@receiver(pre_save, sender=Post)
def prepare_post(sender, instance, **kwargs):
    if not instance.id:
        instance.formatPostLinks()
        instance.create_img_thumbnail()




