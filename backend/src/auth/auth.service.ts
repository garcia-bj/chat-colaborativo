import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async validateUser(details: any) {
        const user = await this.prisma.user.upsert({
            where: { email: details.email },
            update: {
                name: `${details.firstName} ${details.lastName}`,
                avatar: details.picture,
                googleId: details.googleId,
            },
            create: {
                email: details.email,
                name: `${details.firstName} ${details.lastName}`,
                avatar: details.picture,
                googleId: details.googleId,
            },
        });
        return user;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user,
        };
    }
}
