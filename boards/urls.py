from django.urls import path
from .views import BoardView, ThreadDetailView, PostView, CategoryView, NewsView, BoardsConfigurationView

urlpatterns = [
        path('categories/', CategoryView.as_view(), name='Categories'),
        path('news/', NewsView.as_view(), name='News'),
        path('config/', BoardsConfigurationView.as_view(), name='Config'),
        path('<str:slug>/', BoardView.as_view(), name='Board'),
        path('<str:slug>/<int:post_number>',
             ThreadDetailView.as_view(), name='Thread'),
        path('<str:slug>/new_post', PostView.as_view(), name='New post'),
]
