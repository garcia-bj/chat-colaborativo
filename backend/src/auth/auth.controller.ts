
import { Controller, Get, Post, Body, Req, UseGuards, Res } from '@nestjs/common';
import { GoogleAuthGuard } from './google-auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.loginWithEmail(loginDto);
    }

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Req() req) { }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req, @Res() res) {
        const user = await this.authService.validateUser(req.user);
        const { access_token } = await this.authService.login(user);
        res.redirect(`http://localhost:3001/auth/callback?token=${access_token}`);
    }
}
