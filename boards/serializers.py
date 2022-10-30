from django.shortcuts import get_object_or_404
from django.db.utils import IntegrityError
from .models import Board, Post
from rest_framework import serializers
from my_kawaii_imageboard.pagination import ThreadPagination
from datetime import datetime


class PostSerializer(serializers.ModelSerializer):

    post_number = serializers.IntegerField(required=False)
    board = serializers.CharField(required=False)

    def validate(self, attrs):

        if not attrs['message'] and not attrs['file']:
            raise serializers.ValidationError('You must attach file or write comment.')
        return attrs


    class Meta:
        model = Post
        fields = ['id', 'post_number', 'title', 'username', 
                  'email', 'file', 'thumbnail', 'message', 
                  'board', 'parent', 'created', 'updated']
        validators = []

    def create(self, validated_data):

        board = self.context['board']

        post = Post(title=validated_data['title'],
                    username=validated_data['username'],
                    email=validated_data['email'],
                    message=validated_data['message'],
                    board=board,
                    parent=validated_data['parent'],
                    file=validated_data.get('file'))
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

        if post.parent:
            post.parent.updated = datetime.now()
            post.parent.save()
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

    class Meta:
        model = Board
        fields = ['name', 'description', 'thread']

    def get_thread(self, obj):

        opost = self.context['opost']
        return ThreadSerializer(opost).data


class BoardSerializer(serializers.ModelSerializer):
    
    page = serializers.SerializerMethodField()

    class Meta:
        model = Board
        fields = ['name', 'description', 'page']

    def get_page(self, obj):

        paginator = ThreadPagination()
        request = self.context['request']
        queryset = Post.objects.all().order_by('-updated').filter(parent=None, board=obj)
        serializer = ThreadSerializer(queryset, many=True)
        paginated_data = paginator.paginate_queryset(queryset=serializer.data, request=request)

        return paginator.get_paginated_response(paginated_data)







