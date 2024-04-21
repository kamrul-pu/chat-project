"""Consumers for Chatting apps."""

import json

from channels.generic.websocket import AsyncJsonWebsocketConsumer


class PersonalChatConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        # Retrieve the authenticated user from the WebSocket connection scope
        request_user = self.scope["user"]

        # Check if the user is authenticated
        if request_user.is_authenticated:
            # Get the ID of the user to chat with from the URL route parameters
            chat_with_user = self.scope["url_route"]["kwargs"]["id"]

            # Sort user IDs to create a consistent room group name
            user_ids = [int(request_user.id), int(chat_with_user)]
            user_ids = sorted(user_ids)

            # Construct the room group name using sorted user IDs
            self.room_group_name = f"chat_{user_ids[0]}-{user_ids[1]}"

            # Add the WebSocket consumer to the room group
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)

            # Accept the WebSocket connection
            await self.accept()

    async def receive(self, text_data=None, bytes_data=None, **kwargs):
        # Parse received JSON data
        data = json.loads(text_data)

        # Extract the message from the received data
        message = data["message"]

        # Send the message to the room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "chat_message", "message": message},
        )

    async def disconnect(self, code):
        # Remove the WebSocket consumer from the room group upon disconnection
        self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def chat_message(self, event):
        # Retrieve the message from the event data
        message = event["message"]

        # Send the message back to the client over the WebSocket connection
        await self.send(text_data=json.dumps({"message": message}))
