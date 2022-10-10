from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from django.shortcuts import get_object_or_404
from .serializers import PostSerializer, ThreadSerializer, BoardSerializer
from .models import Board, Post


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


class ThreadView(APIView):

    def get(self, request, **kwargs):

        opost = get_object_or_404(Post, board=Board.objects.get(slug=kwargs['slug']),
                                        post_number=kwargs['post_number'])
        if opost.parent:
            raise Http404
        serializer = ThreadSerializer(opost)

        return Response(serializer.data)
