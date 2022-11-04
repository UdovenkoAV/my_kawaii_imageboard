from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from django.shortcuts import get_object_or_404
from .serializers import PostSerializer, ThreadDetailSerializer, BoardSerializer, IndexSerializer, NewsSerializer
from .models import Board, Post, Category, News


class PostView(APIView):

    def post(self, request, **kwargs):

        board = Board.objects.get(slug=kwargs['slug'])
        serializer = PostSerializer(data=request.data, context={'board' : board})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


class BoardView(APIView):

    def get(self, request, **kwargs):

        board = get_object_or_404(Board, slug=kwargs['slug'])
        serializer = BoardSerializer(board, context={'request' : request})
        return Response(serializer.data)


class ThreadDetailView(APIView):

    def get(self, request, **kwargs):

        board = Board.objects.get(slug=kwargs['slug'])
        opost = get_object_or_404(Post, board=board, post_number=kwargs['post_number'])
        if opost.parent:
            raise Http404
        serializer = ThreadDetailSerializer(board, context={'opost' : opost})

        return Response(serializer.data)


class IndexView(APIView):

    def get(self, *args, **kwargs):
        serializer = IndexSerializer(Category.objects.all(), many=True)
        return Response(serializer.data)


class NewsView(APIView):

    def get(self, *args, **kwargs):
        
        serializer = NewsSerializer(News.objects.all(), many=True)
        return Response(serializer.data)
