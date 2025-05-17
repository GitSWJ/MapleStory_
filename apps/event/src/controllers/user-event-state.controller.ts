import { Controller, Post, Get, Body, Param, Request } from '@nestjs/common';
import { UserEventStateService } from '../services/user-event-state.service';
import { CreateUserEventStateDto } from '../dtos/create-user-event-state.dto';

@Controller('user-event-states')
export class UserEventStateController {
  constructor(private readonly userEventStateService: UserEventStateService) {}

  @Post('upsert')
  async upsert(
    @Request() req, 
    @Body() dto: CreateUserEventStateDto
  ) {
    const userId = req.user.sub; // JWT에서 유저 ID 추출
    return this.userEventStateService.upsertUserEventState(userId, dto);
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
