import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthTokenService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async verifyToken(token: string) {
    const authUrl = this.configService.get<string>('AUTH_SERVICE_URL');
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${authUrl}/verify-token`, { token })
      );
      return response.data; // user info
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }
}
