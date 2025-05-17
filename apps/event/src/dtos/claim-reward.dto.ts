import { IsMongoId } from 'class-validator';

export class ClaimRewardDto {
  @IsMongoId()
  eventId: string;

  @IsMongoId()
  eventRuleId: string;

  @IsMongoId()
  rewardId: string;
}
