import { Document } from 'mongoose';

export interface User {
  role: Number;
  user_id: string;
  user_password: string;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  user_address?: string;
  user_birth?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserDocument = User & Document;
