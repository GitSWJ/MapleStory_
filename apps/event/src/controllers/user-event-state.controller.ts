import { Controller, Post, Get, Body, Param, Request } from '@nestjs/common';
import { UserEventStateService } from '../services/user-event-state.service';
import { CreateUserEventStateDto } from '../dtos/create-user-event-state.dto';

@Controller('userstates')
export class UserEventStateController {
  constructor(private readonly userEventStateService: UserEventStateService) {}

  @Post('upsert')
  async upsert( @Body() dto: CreateUserEventStateDto ) {
    return this.userEventStateService.upsertUserEventState(dto.userId, dto);
  }

  @Get(':userId/:eventId')
  async getUserEventState(
    @Param('userId') userId: string,
    @Param('eventId') eventId: string,
  ) {
    return this.userEventStateService.getUserEventState(userId, eventId);
  }

  @Get(':userId')
  async getUserEvents(@Param('userId') userId: string) {
    return this.userEventStateService.getUserEvents(userId);
  }
}
