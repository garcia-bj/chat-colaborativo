import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Post('rooms')
    async createRoom(@Body('name') name: string) {
        return this.chatService.createRoom(name);
    }

    @Get('rooms')
    async getRooms() {
        return this.chatService.getRooms();
    }

    @Get('rooms/:roomId/messages')
    async getMessages(@Param('roomId') roomId: string) {
        return this.chatService.getMessages(roomId);
    }

    @Delete('rooms/:roomId')
    async deleteRoom(@Param('roomId') roomId: string) {
        return this.chatService.deleteRoom(roomId);
    }

    @Delete('messages/:messageId')
    async deleteMessage(@Param('messageId') messageId: string) {
        return this.chatService.deleteMessage(messageId);
    }
}
