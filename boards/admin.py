from django.contrib import admin
from .models import Board, Post, Category, News, BoardsConfiguration
from solo.admin import SingletonModelAdmin


admin.site.register(Board)
admin.site.register(Post)
admin.site.register(Category)
admin.site.register(News)
admin.site.register(BoardsConfiguration, SingletonModelAdmin)

# Register your models here.
