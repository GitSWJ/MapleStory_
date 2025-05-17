import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum EventType {
  ATTENDANCE = 'attendance',
  INVITE = 'invite',
  RANKING = 'ranking',
  ACTION = 'action',
}

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, enum: EventType })
  type: EventType;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;

  @Prop({ default: true })
  isActive?: boolean;

  @Prop()
  description?: string;
}

export type EventDocument = Event & Document;
export const EventSchema = SchemaFactory.createForClass(Event);
