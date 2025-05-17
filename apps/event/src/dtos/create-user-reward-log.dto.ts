import { IsMongoId } from 'class-validator';

export class CreateUserRewardLogDto {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  eventId: string;

  @IsMongoId()
  eventRuleId: string;

  @IsMongoId()
  rewardId: string;
}
