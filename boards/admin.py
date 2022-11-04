from django.contrib import admin
from .models import Board, Post, Category, News


admin.site.register(Board)
admin.site.register(Post)
admin.site.register(Category)
admin.site.register(News)

# Register your models here.
