from django.db.utils import IntegrityError
from .models import Board, Post, Category, News, File
from config.models import SiteConfiguration
from rest_framework import serializers
from my_kawaii_imageboard.pagination import ThreadPagination
from my_kawaii_imageboard.settings import REST_FRAMEWORK
from datetime import datetime


class FileSerializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()

    def validate(self, attrs):
        if self.context.get('file').size > SiteConfiguration.\
                objects.get().max_upload_file_size:
            raise serializers.ValidationError('File is too big.')
        return attrs

    class Meta:
        model = File
        fields = ['id', 'src', 'thumbnail', 'size', 'resolution', 'name']
        validators = []

    def create(self, validated_data):

        file = File(src=self.context['file'])
        file.save()
        return file

    def get_name(self, obj):
        return obj.src.name.split('/')[1]
    
    def get_size(self, obj):
        return obj.src.size


class PostSerializer(serializers.ModelSerializer):

    post_number = serializers.IntegerField(required=False)
    board = serializers.CharField(required=False)
    file = FileSerializer(read_only=True, required=False)

    def validate(self, attrs):

        if not attrs.get('parent') and not self.context.get('file'):
            raise serializers.ValidationError('You must attach file.')
        elif attrs.get('parent') and not attrs.get('message') and not self \
                .context.get('file'):
            raise serializers\
                    .ValidationError('You must attach file or write comment.')

        return attrs

    class Meta:

        model = Post
        fields = ['id', 'post_number', 'title', 'username',
                  'email', 'file', 'message', 'board',
                  'parent', 'created', 'updated']
        validators = []

    def create(self, validated_data):

        board = self.context['board']

        post = Post(title=validated_data['title'],
                    username=validated_data['username'],
                    email=validated_data['email'],
                    message=validated_data['message'],
                    board=board,
                    parent=validated_data['parent'],
                    file=self.context.get('file'))
        while True:
            queryset = Post.objects.all().filter(board=board)
            post_number = queryset.last().post_number + 1 if queryset else 1
            post.post_number = post_number
            try:
                post.save()
            except IntegrityError:
                continue
            else:
                break

        if post.parent and len(post.parent.replies.all())\
                < board.bump_limit and post.email != 'sage':
            post.parent.updated = datetime.now()
            post.parent.save()
        oposts = board.posts.all().order_by('-updated').filter(parent=None)
        if len(oposts) > board.pages_limit * REST_FRAMEWORK.get('PAGE_SIZE'):
            oposts.last().delete()
        return post


class ThreadSerializer(serializers.Serializer):

    opost = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()

    def get_opost(self, obj):
        return PostSerializer(obj).data

    def get_replies(self, obj):
        return PostSerializer(obj.replies.all(), many=True).data


class ThreadDetailSerializer(serializers.ModelSerializer):

    thread = serializers.SerializerMethodField()
    max_upload_file_size = serializers.SerializerMethodField()

    class Meta:
        model = Board
        fields = [
                'name',
                'description',
                'default_username',
                'max_upload_file_size',
                'thread']

    def get_thread(self, obj):

        opost = self.context['opost']
        return ThreadSerializer(opost).data

    def get_max_upload_file_size(self, obj):
        return SiteConfiguration.objects.get().max_upload_file_size


class BoardSerializer(serializers.ModelSerializer):

    page = serializers.SerializerMethodField()
    max_upload_file_size = serializers.SerializerMethodField()

    class Meta:
        model = Board
        fields = [
                'name',
                'description',
                'default_username',
                'max_upload_file_size',
                'page']

    def get_page(self, obj):

        paginator = ThreadPagination()
        request = self.context['request']
        queryset = Post.objects.all().order_by('-updated')\
                                     .filter(parent=None, board=obj)
        serializer = ThreadSerializer(queryset, many=True)
        paginated_data = paginator.paginate_queryset(queryset=serializer.data,
                                                     request=request)

        return paginator.get_paginated_response(paginated_data)

    def get_max_upload_file_size(self, obj):
        return SiteConfiguration.objects.get().max_upload_file_size


class BoardsListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Board
        fields = ['slug', 'name']


class CategorySerializer(serializers.ModelSerializer):

    boards = BoardsListSerializer(many=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'boards']


class NewsSerializer(serializers.ModelSerializer):

    author = serializers.SlugRelatedField(
            slug_field='username',
            read_only=True)

    class Meta:
        model = News
        fields = '__all__'
