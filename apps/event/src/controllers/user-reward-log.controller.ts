import { Controller, Post, Get, Body, Param, Request } from '@nestjs/common';
import { UserRewardLogService } from '../services/user-reward-log.service';
import { ClaimRewardDto } from '../dtos/claim-reward.dto';


@Controller('reward-logs')
export class UserRewardLogController {
  constructor(private readonly userRewardLogService: UserRewardLogService) {}

  @Post('claim')
  async claimReward(@Body() dto: ClaimRewardDto) {
    return this.userRewardLogService.claimReward(dto);
  }

  @Get('list')
  async getAllUserRewards() {
    return this.userRewardLogService.getAllUserRewards();
  }

  @Get('user/:userId')
  async getUserRewards(@Param('userId') userId: string) {
    return this.userRewardLogService.getUserRewards(userId);
  }

}
