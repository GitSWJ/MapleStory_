import {
  IsEnum,
  IsString,
  IsOptional,
} from 'class-validator';
import { RewardType } from '../schemas/reward.schema';

export class CreateRewardDto {
  @IsEnum(RewardType)
  type: RewardType;

  @IsString()
  value: string;

  @IsString()
  displayName: string;

  @IsOptional()
  @IsString()
  description?: string;
}
