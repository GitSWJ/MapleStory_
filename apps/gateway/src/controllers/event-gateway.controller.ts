import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

import { Roles } from '../decorators/roles.decorator';
import { Public } from '../decorators/public.decorator';

@Controller('events')
export class EventGatewayController {
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
      this.http.post(`${this.baseUrl}/events`, body, {
        headers: { Authorization: token },
      }),
    );

    return res.data;
  }

  @Get()
  @Public()
  async getAllEvent(@Req() req) {
    const token = req.headers['authorization'];

    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/events`, {
        headers: { Authorization: token },
      }),
    );

    return res.data;
  }
}
