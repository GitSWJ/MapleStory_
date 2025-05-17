import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum RewardType {
  CURRENCY = 'currency',
  ITEM = 'item',
  COUPON = 'coupon',
}

@Schema({ timestamps: true })
export class Reward {
  @Prop({ required: true, enum: RewardType })
  type: RewardType;

  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  displayName: string;

  @Prop()
  description?: string;
}

export type RewardDocument = Reward & Document;
export const RewardSchema = SchemaFactory.createForClass(Reward);
