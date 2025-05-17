import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Roles } from '../decorators/roles.decorator';
import { ConfigService } from '@nestjs/config';

@Controller('rules')
export class EventRulesGatewayController {
  private baseUrl: string;
  constructor(
    private readonly http: HttpService,
    private readonly ConfigService: ConfigService,
  ) {
    this.baseUrl = this.ConfigService.get<string>('EVENT_SERVICE_URL');
  }

  @Post()
  @Roles(0)
  async createEvent(@Body() body, @Req() req) {
    const token = req.headers['authorization'];

    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/rules`, body, {
        headers: { Authorization: token },
      }),
    );

    return res.data;
  }

  @Get()
  @Roles(0)
  async getAllEvent(@Req() req) {
    const token = req.headers['authorization'];

    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/rules`, {
        headers: { Authorization: token },
      }),
    );

    return res.data;
  }
}
