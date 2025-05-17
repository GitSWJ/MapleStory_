import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRewardDto } from '../dtos/create-reward.dto';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel('Reward') private readonly rewardModel: Model<any>,
  ) {}

  async create(dto: CreateRewardDto) {
    return await this.rewardModel.create(dto);
  }

  async findAll() {
    return await this.rewardModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    return await this.rewardModel.findById(id).exec();
  }
}
