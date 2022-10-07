
from .models import Board, Post
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Post
        fields = ['post_number', 'title', 'username', 
                'email', 'file', 'thumbnail', 
                'message', 'created', 'updated', 'parent', 'board']
        validators = []


class ThreadSerializer(serializers.Serializer):

    opost = serializers.SerializerMethodField()
    posts = serializers.SerializerMethodField()

    def get_opost(self, obj):
        return PostSerializer(obj).data

    def get_posts(self, obj):
        return PostSerializer(obj.replyes.all(), many=True).data 


class BoardSerializer(serializers.ModelSerializer):
    
    threads = serializers.SerializerMethodField()

    class Meta:
        model = Board
        fields = ['name', 'description', 'threads']

    def get_threads(self, obj):
        return ThreadSerializer(Post.objects.all().filter(parent=None), 
                                many=True).data



