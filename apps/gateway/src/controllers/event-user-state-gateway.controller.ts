import { Controller, Post, Body, Req } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Roles } from '../decorators/roles.decorator';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Controller('userstates')
export class EventUserStateGatewayController {
  private baseUrl: string;
  constructor(
    private readonly http: HttpService,
    private readonly ConfigService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.baseUrl = this.ConfigService.get<string>('EVENT_SERVICE_URL');
  }

  @Post('upsert')
  @Roles(0)
  async createEvent(@Body() body, @Req() req) {
    const token = req.headers['authorization'];
 
    const userId = body.userId;

    const res = await lastValueFrom(
      this.http.post(`${this.baseUrl}/userstates/upsert`, {
        ...body,
        userId,
      }, {
        headers: { Authorization: token },
      }),
    );

    return res.data;
  }
}
