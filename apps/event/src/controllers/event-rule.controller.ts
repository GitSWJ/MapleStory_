import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { EventRuleService } from '../services/event-rule.service';
import { CreateEventRuleDto } from '../dtos/create-event-rule.dto';

@Controller('rules')
export class EventRuleController {
  constructor(private readonly eventRuleService: EventRuleService) {}

  @Post()
  async create(@Body() dto: CreateEventRuleDto) {
    return this.eventRuleService.create(dto);
  }

  @Get()
  async findAll() {
    return this.eventRuleService.findAll();
  }

  @Get('/event/:eventId')
  async findByEvent(@Param('eventId') eventId: string) {
    return this.eventRuleService.findByEvent(eventId);
  }
}
