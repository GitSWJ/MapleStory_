import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { ProxyService } from '../proxy/proxy.service';

@Controller('event')
export class EventController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getEvents(@Req() req: Request) {
    return this.proxyService.forwardToEvent('/event', req.headers);
  }
}
