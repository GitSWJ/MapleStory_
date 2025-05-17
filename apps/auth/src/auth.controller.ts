import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './user/dto/login.dto';
import { CreateUserDto } from './user/dto/create-user.dto';
import { Public } from './decorators/public.decorator';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('create')
  async create(@Body() createDto: CreateUserDto) {
    return this.authService.create(createDto);
  }

  @Post('verify-token')
  @Public()
  verifyToken(@Body() body: { token: string }) {
    try {
      const decoded = this.jwtService.verify(body.token);
      return decoded;
    } catch (err) {
      throw new UnauthorizedException('유효하지 않은 토큰');
    }
  }

}
