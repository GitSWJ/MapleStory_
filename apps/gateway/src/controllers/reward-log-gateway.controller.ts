import { Controller, Post, Body, Req, Get, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Roles } from '../decorators/roles.decorator';
import { Public } from '../decorators/public.decorator';

@Controller('reward-logs')
export class RewardLogGatewayController {
  private baseUrl: string;
  constructor(
    private readonly http: HttpService,
    private readonly ConfigService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.baseUrl = this.ConfigService.get<string>('EVENT_SERVICE_URL');
  }

  @Post('claim')
  @Public()
  async createEvent(@Body() body, @Req() req) {
    const token = req.headers['authorization'];
    const user = this.jwtService.verify(token.split(' ')[1]);
    const userId = user.sub;
    
    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/reward-logs/claim`,{
        ...body,
        userId,
      }, {
        headers: { Authorization: token },
      }),
    );

    return res.data;
  }

  @Get('list')
  @Roles(0)
  async getAllEvent(@Req() req) {
    const token = req.headers['authorization'];

    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/reward-logs/list`, {
        headers: { Authorization: token },
      }),
    );

    return res.data;
  }

  @Get('user/:userId')
  @Roles(0)
  async getUserRewardLogs(@Param('userId') userId: string, @Req() req) {
    const token = req.headers['authorization'];

    const res = await lastValueFrom(
      this.http.get(`${this.baseUrl}/reward-logs/user/${userId}`, {
        headers: { Authorization: token },
      }),
    );

    return res.data;
  }
}
