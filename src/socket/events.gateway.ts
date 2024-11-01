import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, {
  cors: {
    origin: 'http://localhost:3001', // Your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('chat')
  handleChat(
    client: Socket,
    payload: { message: string; username: string },
  ): void {
    console.log(
      `Received chat message from ${payload.username}: ${payload.message}`,
    );
    this.server.emit('chat', payload);
  }

  @SubscribeMessage('image')
  handleImage(
    client: Socket,
    payload: { message: string; username: string },
  ): void {
    this.server.emit('chat', payload);
  }
}
