import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './user/dto/login.dto';
import { UserService } from './user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(user_id: string, user_password: string) {
    const user = await this.userService.findByUserId(user_id);
    if (user && user.user_password === user_password) { // 실제로는 해시 비교 필요
      const { user_password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.user_id, loginDto.user_password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { user_id: user.user_id, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}