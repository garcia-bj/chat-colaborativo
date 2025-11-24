import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) { }

    async createRoom(name: string) {
        return this.prisma.room.create({
            data: { name },
        });
    }

    async getRooms() {
        return this.prisma.room.findMany();
    }

    async saveMessage(userId: string, roomId: string, content: string) {
        return this.prisma.message.create({
            data: {
                content,
                userId,
                roomId,
            },
            include: {
                user: true,
            },
        });
    }

    async getMessages(roomId: string) {
        return this.prisma.message.findMany({
            where: { roomId },
            include: { user: true },
            orderBy: { createdAt: 'asc' },
        });
    }

    async deleteRoom(roomId: string) {
        // Delete all messages in the room first
        await this.prisma.message.deleteMany({
            where: { roomId },
        });
        // Then delete the room
        return this.prisma.room.delete({
            where: { id: roomId },
        });
    }

    async deleteMessage(messageId: string) {
        return this.prisma.message.delete({
            where: { id: messageId },
        });
    }
}
