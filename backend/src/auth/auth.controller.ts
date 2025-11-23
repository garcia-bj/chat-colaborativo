
import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { GoogleAuthGuard } from './google-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Req() req) { }

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req, @Res() res) {
        const { access_token } = await this.authService.login(req.user);
        res.redirect(`http://localhost:3001/auth/callback?token=${access_token}`);
    }
}
