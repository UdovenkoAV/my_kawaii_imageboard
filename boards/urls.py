from django.urls import path
from .views import BoardView, ThreadDetailView, PostView

urlpatterns = [
        path('<str:slug>/', BoardView.as_view(), name='Board'),
        path('<str:slug>/<int:post_number>',
             ThreadDetailView.as_view(), name='Thread'),
        path('<str:slug>/new_post', PostView.as_view(), name='New post'),
]
