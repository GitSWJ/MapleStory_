import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserEventState {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  progress: number;

  @Prop({ type: Date, default: Date.now })
  lastUpdatedAt?: Date;
}

export type UserEventStateDocument = UserEventState & Document;
export const UserEventStateSchema = SchemaFactory.createForClass(UserEventState);
