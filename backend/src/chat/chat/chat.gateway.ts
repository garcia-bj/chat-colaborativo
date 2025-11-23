import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from '../chat.service';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) { }

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers.authorization?.split(' ')[1];
      if (!token) {
        client.disconnect();
        return;
      }
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'supersecretkey',
      });
      client.data.user = payload;
      console.log(`Client connected: ${client.id}, User: ${payload.email}`);
    } catch (e) {
      console.log('Connection unauthorized');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(roomId);
    console.log(`Client ${client.id} joined room ${roomId}`);
    return { event: 'joinedRoom', data: roomId };
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() payload: { roomId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;
    if (!user) return;

    const message = await this.chatService.saveMessage(
      user.sub,
      payload.roomId,
      payload.content,
    );

    this.server.to(payload.roomId).emit('receiveMessage', message);
  }
}
