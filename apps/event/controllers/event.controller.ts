import { Controller, Post, Get, Body } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dtos/create-event.dto';
import { Roles } from '../decorators/roles.decorator';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Roles(0, 1)
  @Post()
  async create(@Body() dto: CreateEventDto) {
    return this.eventService.create(dto);
  }

  @Get()
  async findAll() {
    return this.eventService.findAll();
  }

  @Get('/active')
  async findActive() {
    return this.eventService.findActive();
  }
}
