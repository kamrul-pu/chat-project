"""Routers for chat."""

from django.urls import re_path, path
from .consumers import PersonalChatConsumer

# URLs that handle the WebSocket connection are placed here.
websocket_urlpatterns = [
    # re_path(r"ws/chat/(?P<chat_box_name>\w+)/$", PersonalChatConsumer.as_asgi()),
    path("ws/chat/<int:id>/", PersonalChatConsumer.as_asgi()),
]
