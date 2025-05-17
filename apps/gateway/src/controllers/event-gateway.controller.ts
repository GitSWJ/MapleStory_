import { Controller, Get, Req } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { Request } from 'express';

@Controller('event')
export class EventGatewayController {
  @Get()
  @Roles(0, 1)
  getProtectedEvent(@Req() req: Request) {
    return {
      message: '접근 성공',
      user: req['user'],
    };
  }
}
