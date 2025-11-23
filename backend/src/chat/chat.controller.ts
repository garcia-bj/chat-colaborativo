import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // We need to create this

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Post('rooms')
    // @UseGuards(JwtAuthGuard) // Uncomment when Guard is ready
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
}
