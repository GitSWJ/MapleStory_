import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventRuleDto } from '../dtos/create-event-rule.dto';

@Injectable()
export class EventRuleService {
  constructor(
    @InjectModel('EventRule') private readonly eventRuleModel: Model<any>,
  ) {}

  async create(dto: CreateEventRuleDto) {
    return await this.eventRuleModel.create(dto);
  }

  async findAll() {
    return await this.eventRuleModel.find().sort({ createdAt: -1 }).exec();
  }

  async findByEvent(eventId: string) {
    return await this.eventRuleModel.find({ eventId }).exec();
  }
  
  async findOne(id: string) {
    return await this.eventRuleModel.findById(id).exec();
  }
}
