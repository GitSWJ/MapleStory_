import { IsEnum, IsObject, IsMongoId, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ConditionType } from '../schemas/event-rule.schema';

export class CreateEventRuleDto {
  @IsMongoId()
  eventId: string;

  @IsEnum(ConditionType)
  conditionType: ConditionType;

  @IsNumber()
  @Type(() => Number)
  conditionParams: number;

  @IsMongoId()
  rewardId: string;
}
