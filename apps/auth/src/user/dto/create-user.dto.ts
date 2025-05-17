import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsMobilePhone,
  IsDateString,
  IsInt,
} from 'class-validator';

export class CreateUserDto {
  @IsInt()
  role: Number;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  user_password: string;

  @IsString()
  @IsOptional()
  user_name?: string;

  @IsEmail()
  @IsOptional()
  user_email?: string;

  @IsMobilePhone('ko-KR')
  @IsOptional()
  user_phone?: string;

  @IsString()
  @IsOptional()
  user_address?: string;

  @IsDateString()
  @IsOptional()
  user_birth?: string;
}
