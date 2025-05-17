import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum ConditionType {
  ATTENDANCE = 'attendance',
  INVITE = 'invite',
  RANKING = 'ranking',
  ACTION = 'action',
}

@Schema({ timestamps: true })
export class EventRule {
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;

  @Prop({ type: String, enum: ConditionType, required: true })
  conditionType: ConditionType;

  @Prop({ type: Number, required: true })
  conditionParams: number;

  @Prop({ type: Types.ObjectId, ref: 'Reward', required: true })
  rewardId: Types.ObjectId;
}

export type EventRuleDocument = EventRule & Document;
export const EventRuleSchema = SchemaFactory.createForClass(EventRule);
