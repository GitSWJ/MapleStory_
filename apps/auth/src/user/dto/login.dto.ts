import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  user_password: string;

  @IsNumber()
  @IsNotEmpty()
  role: number;
}
