from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.parsers import JSONParser, MultiPartParser
from .serializers import PostSerializer, ThreadDetailSerializer, BoardSerializer, CategorySerializer, NewsSerializer, BoardsConfigurationSerializer, FileSerializer
from .models import Board, Post, Category, News, BoardsConfiguration, File


class FileUploadView(APIView):

    parser_class = [MultiPartParser]
    permission_classes = []
    def post(self, request, **kwargs):
        serializer = FileSerializer(data=request.data, context={'file' : request.data.get('file')})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)             



class PostView(APIView):
    parser_class = [JSONParser]
    permission_classes = []
    def post(self, request, **kwargs):
        context = {}
        context['board'] = Board.objects.get(slug=kwargs['slug'])
        if request.data['file']:
            context['file'] = File.objects.get(id=request.data['file'])
        serializer = PostSerializer(data=request.data, context=context)
        if serializer.is_valid(raise_exception=True):
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


class CategoryView(APIView):

    def get(self, *args, **kwargs):
        serializer = CategorySerializer(Category.objects.all(), many=True)
        return Response(serializer.data)


class NewsView(APIView):

    def get(self, *args, **kwargs):
        
        serializer = NewsSerializer(News.objects.all(), many=True)
        return Response(serializer.data)

class BoardsConfigurationView(APIView):

    def get(self, *args, **kwargs):

        serializer = BoardsConfigurationSerializer(
                BoardsConfiguration.objects.get())
        return Response(serializer.data)
