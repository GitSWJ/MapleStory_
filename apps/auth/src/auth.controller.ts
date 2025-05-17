import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './user/dto/login.dto';
import { CreateUserDto } from './user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('create')
  async create(@Body() createDto: CreateUserDto) {
    return this.authService.create(createDto);
  }

  @Post('verify')
  async verifyToken(@Body() authHeader: string) {
    // 생략
  }
}
