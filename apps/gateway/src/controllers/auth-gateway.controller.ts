import { Controller, Post, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthGatewayController {
  private baseUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('AUTH_SERVICE_URL');
  }

  @Public()
  @Post('create')
  async register(@Body() body) {
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/create`, body),
    );
    return res.data;
  }

  @Public()
  @Post('login')
  async login(@Body() body) {
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/login`, body),
    );
    return res.data;
  }
}
