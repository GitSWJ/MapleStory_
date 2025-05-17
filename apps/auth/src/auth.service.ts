import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(user_id: string, user_password: string): Promise<any> {
    const user = await this.userService.findByUserId(user_id);
    
    if (!user) return null;

    const isPasswordMatch = await bcrypt.compare(user_password, user.user_password);

    if (isPasswordMatch) {
      const { user_password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user._id,
      user_id: user.user_id,
      user_name: user.user_name,
      role: Number(user.role),
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
