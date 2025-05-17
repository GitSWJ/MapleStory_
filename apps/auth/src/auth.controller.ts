import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: { user_id: string; user_password: string }) {
    const user = await this.authService.validateUser(body.user_id, body.user_password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    return this.authService.login(user);
  }
}
