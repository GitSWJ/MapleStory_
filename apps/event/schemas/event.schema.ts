import { Schema } from 'mongoose';

export enum EventType {
  ATTENDANCE = 'attendance',
  INVITE = 'invite',
  RANKING = 'ranking',
  ACTION = 'action',
}

export const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: Object.values(EventType), required: true },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    description: { type: String },
  },
  {
    timestamps: true,
  },
);
