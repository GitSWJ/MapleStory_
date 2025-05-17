import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './user/dto/login.dto';
import { UserService } from './user/user.service';
import { CreateUserDto } from './user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async create(registerDto: CreateUserDto) {
    const user = await this.userService.create(registerDto);
    return {
      message: 'User registered successfully',
      user: {
        user_id: user.user_id,
        name: user.user_name,
        role: user.role,
      },
    };
  }

  async validateUser(user_id: string, user_password: string) {
    const user = await this.userService.findByUserId(user_id);
    if (user && await bcrypt.compare(user_password, user.user_password)) {
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