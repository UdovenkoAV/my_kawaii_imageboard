from django.db import models
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.core.files.base import ContentFile
from django.core.exceptions import ObjectDoesNotExist
from io import BytesIO
from PIL import Image
import os
import re
import cv2
import numpy as np


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

    class Meta:
        unique_together =[['post_number', 'board']]

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

    def get_extension(self):
        
        _, extension = os.path.splitext(self.file.name)
        return extension.lower()
        
        
@receiver(pre_save, sender=Post)
def prepare_post(sender, instance, **kwargs):
    if instance.id:
        return
    instance.formatPostLinks()
    if instance.file and instance.get_extension() in ['.jpeg', '.jpg', '.gif', '.png']:
        instance.create_img_thumbnail()


@receiver(post_save, sender=Post)
def create_video_thumbnail(sender, instance, **kwargs):
    if not instance.file:
        return
    def resize_image(image, size=(150, 150)):

        h, w = image.shape[:2]
        c = image.shape[2] if len(image.shape) > 2 else 1

        if h == w:
            return cv2.resize(image, size, cv2.INTER_AREA)

        dif = h if h > w else w

        interpolation = cv2.INTER_AREA if dif > (size[0] + size[1]) // 2 else cv2.INTER_CUBIC

        x_pos = (dif - w) // 2
        y_pos = (dif - h) // 2

        if len(image.shape) == 2:
           mask = np.zeros((dif, dif), dtype=image.dtype)
           mask[y_pos:y_pos + h, x_pos:x_pos + w] = image[:h, :w]
        else:
           mask = np.zeros((dif, dif, c), dtype=image.dtype)
           mask[y_pos:y_pos + h, x_pos:x_pos + w, :] = image[:h, :w, :]

        return cv2.resize(mask, size, interpolation)

    if not instance.thumbnail and instance.get_extension() in ['.webm', '.mp4']:

        vidcap = cv2.VideoCapture(instance.file.path)
        file_name, _ = os.path.splitext(instance.file.name)
        vidcap.set(1, 1.0)
        success, image = vidcap.read()
        image = resize_image(image)
        is_success, buffer = cv2.imencode(".jpg", image)
        io_buf = BytesIO(buffer)
        instance.thumbnail.save(file_name + '.jpg', ContentFile(io_buf.read()), save=True)
        io_buf.close()


