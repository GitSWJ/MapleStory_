import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthTokenService {
  constructor(private readonly httpService: HttpService) {}

  async verifyToken(token: string) {
    try {
      const response = await lastValueFrom(
        this.httpService.post('http://localhost:3001/auth/verify-token', {
          token,
        })
      );
      return response.data; // user info
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }
}
