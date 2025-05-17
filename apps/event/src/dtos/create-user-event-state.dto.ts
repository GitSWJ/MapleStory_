import { IsMongoId, IsOptional, IsObject, IsNumber } from 'class-validator';

export class CreateUserEventStateDto {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  eventId: string;

  @IsNumber()
  @IsOptional()
  progress: number;
}
