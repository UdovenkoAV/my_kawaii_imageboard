from django.urls import path
from .views import BoardView, ThreadDetailView, PostView, IndexView, NewsView

urlpatterns = [
        path('index/', IndexView.as_view(), name='Index'),
        path('news/', NewsView.as_view(), name='News'),
        path('<str:slug>/', BoardView.as_view(), name='Board'),
        path('<str:slug>/<int:post_number>',
             ThreadDetailView.as_view(), name='Thread'),
        path('<str:slug>/new_post', PostView.as_view(), name='New post'),
]
