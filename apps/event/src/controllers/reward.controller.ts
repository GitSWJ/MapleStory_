import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RewardService } from '../services/reward.service';
import { CreateRewardDto } from '../dtos/create-reward.dto';

@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  async create(@Body() dto: CreateRewardDto) {
    return this.rewardService.create(dto);
  }

  @Get()
  async findAll() {
    return this.rewardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.rewardService.findOne(id);
  }
}
