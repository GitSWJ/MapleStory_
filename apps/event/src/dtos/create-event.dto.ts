import {
  IsString,
  IsEnum,
  IsDate,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EventType } from '../schemas/event.schema';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsEnum(EventType)
  type: EventType;

  @Type(() => Date)
  @IsDate()
  startAt: Date;

  @Type(() => Date)
  @IsDate()
  endAt: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}
