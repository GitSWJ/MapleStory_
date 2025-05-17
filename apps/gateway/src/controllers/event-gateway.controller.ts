import { Controller, Get } from '@nestjs/common';

@Controller('event')
export class EventGatewayController {
  @Get()
  getEvent() {
    return { message: 'Event data from gateway' };
  }
}
