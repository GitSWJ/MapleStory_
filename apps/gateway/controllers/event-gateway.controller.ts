import { Controller, All, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../shared/role.enum';
import { proxyToEventService } from '../proxies/event.proxy';

@Controller('event')
export class EventGatewayController {
  @All('*')
  @Roles(Role.User, Role.Admin)
  async proxy(@Req() req: Request, @Res() res: Response) {
    return proxyToEventService(req, res);
  }
}