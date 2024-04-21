"""
ASGI config for app project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

from channels.routing import ProtocolTypeRouter, URLRouter
from chat.route import websocket_urlpatterns
from channels.auth import AuthMiddlewareStack

from chat.channels_middleware import JWTWebsocketMiddleware

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")

# application = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": JWTWebsocketMiddleware(
            AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
        ),
    }
)
