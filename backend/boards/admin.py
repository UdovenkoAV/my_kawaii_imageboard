from django.contrib import admin
from .models import Board, Post, Category, News, File

admin.site.register(Board)
admin.site.register(Post)
admin.site.register(Category)
admin.site.register(News)
admin.site.register(File)

# Register your models here.
