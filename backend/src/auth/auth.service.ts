import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const { name, email, password } = registerDto;

        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('Email already registered');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return this.login(userWithoutPassword);
    }

    async validateEmailPassword(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    async loginWithEmail(loginDto: LoginDto) {
        const user = await this.validateEmailPassword(loginDto);
        return this.login(user);
    }

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

