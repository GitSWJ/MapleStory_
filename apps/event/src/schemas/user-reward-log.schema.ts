import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserRewardLog {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'EventRule', required: true })
  eventRuleId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Reward', required: true })
  rewardId: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  claimedAt?: Date;
}

export type UserRewardLogDocument = UserRewardLog & Document;
export const UserRewardLogSchema = SchemaFactory.createForClass(UserRewardLog);
