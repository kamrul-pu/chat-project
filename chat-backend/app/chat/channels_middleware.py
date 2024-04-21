"""Channel Middleware to handle websocket authentication"""

from channels.middleware import BaseMiddleware
from django.db import close_old_connections

from rest_framework.exceptions import AuthenticationFailed

from core.token_authentication import JWTAuthentication


class JWTWebsocketMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        # Close old database connections to prevent usage of stale connections
        close_old_connections()

        # Extract token from query parameters in the WebSocket connection scope
        query_string = scope.get("query_string", b"").decode("utf-8")
        query_parameters = dict(qp.split("=") for qp in query_string.split("&"))
        token = query_parameters.get("token", None)

        # If no token is provided, close the WebSocket connection with code 4000
        if token is None:
            await send(
                {
                    "type": "websocket.close",
                    "code": 4000,
                }
            )

        # Authenticate the user using JWT authentication
        authentication = JWTAuthentication()
        try:
            # Attempt to authenticate the user with the provided token
            user = await authentication.authenticate_websocket(scope, token)

            # If authentication is successful, set the authenticated user in the scope
            if user is not None:
                scope["user"] = user
            else:
                # If user is not authenticated, close the WebSocket connection with code 4000
                await send(
                    {
                        "type": "websocket.close",
                        "code": 4000,
                    }
                )

            # Call the next middleware or application with the updated scope
            return await super().__call__(scope, receive, send)

        except AuthenticationFailed:
            # If authentication fails, close the WebSocket connection with code 4002
            await send(
                {
                    "type": "websocket.close",
                    "code": 4002,
                }
            )
