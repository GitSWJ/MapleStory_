import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from '../dtos/create-event.dto';
import { EventType } from '../schemas/event.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<any>,
  ) {}

  async create(dto: CreateEventDto) {
    return await this.eventModel.create(dto);
  }

  async findAll() {
    return await this.eventModel.find().sort({ createdAt: -1 }).exec();
  }

  async findActive() {
    const now = new Date();
    return await this.eventModel.find({
      isActive: true,
      startAt: { $lte: now },
      endAt: { $gte: now },
    }).exec();
  }
}
