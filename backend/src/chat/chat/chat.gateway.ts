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

interface OnlineUser {
  id: string;
  name: string;
  email: string;
  socketId: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Map to track online users by room
  private roomUsers: Map<string, Map<string, OnlineUser>> = new Map();

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

    // Remove user from all rooms and notify
    this.roomUsers.forEach((users, roomId) => {
      const user = users.get(client.id);
      if (user) {
        users.delete(client.id);

        // Notify room that user left
        this.server.to(roomId).emit('userLeft', { user });

        // Update online users list
        this.emitOnlineUsers(roomId);
      }
    });
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;
    if (!user) return;

    client.join(roomId);
    console.log(`Client ${client.id} joined room ${roomId}`);

    // Initialize room users map if not exists
    if (!this.roomUsers.has(roomId)) {
      this.roomUsers.set(roomId, new Map());
    }

    const roomUsersMap = this.roomUsers.get(roomId);
    if (!roomUsersMap) return; // Safety check

    const onlineUser: OnlineUser = {
      id: user.sub,
      name: user.email.split('@')[0], // Use email prefix as name
      email: user.email,
      socketId: client.id,
    };

    // Add user to room
    roomUsersMap.set(client.id, onlineUser);

    // Notify room that user joined
    this.server.to(roomId).emit('userJoined', { user: onlineUser });

    // Send updated online users list
    this.emitOnlineUsers(roomId);

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

  @SubscribeMessage('createRoom')
  async handleCreateRoom(
    @MessageBody() payload: { name: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = await this.chatService.createRoom(payload.name);
    this.server.emit('roomCreated', room);
    return room;
  }

  @SubscribeMessage('deleteRoom')
  async handleDeleteRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    await this.chatService.deleteRoom(roomId);

    // Remove room from tracking
    this.roomUsers.delete(roomId);

    this.server.emit('roomDeleted', roomId);
  }

  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(
    @MessageBody() payload: { messageId: string; roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    await this.chatService.deleteMessage(payload.messageId);
    this.server.to(payload.roomId).emit('messageDeleted', payload.messageId);
  }

  // Helper method to emit online users for a room
  private emitOnlineUsers(roomId: string) {
    const roomUsersMap = this.roomUsers.get(roomId);
    if (roomUsersMap) {
      const users = Array.from(roomUsersMap.values());
      this.server.to(roomId).emit('onlineUsers', users);
    }
  }
}
