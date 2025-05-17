import { Controller, Post, Get, Body, Param, Request } from '@nestjs/common';
import { UserRewardLogService } from '../services/user-reward-log.service';
import { ClaimRewardDto } from '../dtos/claim-reward.dto';


@Controller('user-reward-logs')
export class UserRewardLogController {
  constructor(private readonly userRewardLogService: UserRewardLogService) {}

  @Post('claim')
  async claimReward(
    @Request() req,
    @Body() dto: ClaimRewardDto,
  ) {
    const userId = req.user.sub; // JWT에서 유저 ID 추출
    return this.userRewardLogService.claimReward({ ...dto, userId });
  }

  @Get('list')
  async getAllUserRewards() {
    return this.userRewardLogService.getAllUserRewards();
  }

  @Get(':userId')
  async getUserRewards(@Param('userId') userId: string) {
    return this.userRewardLogService.getUserRewards(userId);
  }

}
