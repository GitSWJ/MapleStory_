import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserEventStateDto } from '../dtos/create-user-event-state.dto';

@Injectable()
export class UserEventStateService {
  constructor(
    @InjectModel('UserEventState') private readonly userEventStateModel: Model<any>
  ) {}

  async upsertUserEventState(userId: string, dto: CreateUserEventStateDto) {
    const { eventId, progress } = dto;
    return await this.userEventStateModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId), eventId: new Types.ObjectId(eventId) },
      { $set: { progress, lastUpdatedAt: new Date() } },
      { upsert: true, new: true },
    );
  }


  async getUserEventState(userId: string, eventId: string) {
    return await this.userEventStateModel.findOne({
      userId: new Types.ObjectId(userId),
      eventId: new Types.ObjectId(eventId),
    });
  }

  async getUserEvents(userId: string) {
    return await this.userEventStateModel.find({
      userId: new Types.ObjectId(userId),
    });
  }

  async findOne(query: any) {
    return await this.userEventStateModel.findOne(query).exec();
  }
}
