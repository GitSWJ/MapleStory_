import { Controller, Post, Body, UnauthorizedException, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user/user.service';
import { LoginDto } from './user/dto/login.dto';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  // 회원가입
  @Post('signup')
  async signup(@Body() body: { user_id: string; user_password: string; user_name: string }) {
    // 이미 있는 아이디인지 체크
    const existingUser = await this.userService.findByUserId(body.user_id);
    if (existingUser) {
      throw new UnauthorizedException('User ID already exists');
    }

    // 사용자 생성
    const user = await this.userService.create({
      user_id: body.user_id,
      user_password: body.user_password,
      user_name: body.user_name,
      role: 1, // 기본 권한 등 필요에 따라 추가
    });

    return { message: 'User created', user_id: user.user_id };
  }

  // 로그인
  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.user_id, body.user_password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @Get('test')
  test() {
    return { message: 'Auth service is running' };
  }

}
