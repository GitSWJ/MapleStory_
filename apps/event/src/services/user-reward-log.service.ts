import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserRewardLogDto } from '../dtos/create-user-reward-log.dto';
import { UserEventStateService } from '../services/user-event-state.service';
import { EventRuleService } from '../services/event-rule.service';

@Injectable()
export class UserRewardLogService {
  constructor(
    @InjectModel('UserRewardLog') private readonly userRewardLogModel: Model<any>,
    private readonly userEventStateService: UserEventStateService,  // UserEventStateService 주입
    private readonly eventRuleService: EventRuleService, // EventRuleService 주입
  ) {}

  async claimReward(dto: CreateUserRewardLogDto) {
    const { userId, eventId, eventRuleId, rewardId } = dto;

    // 중복 수령 체크
    const alreadyClaimed = await this.userRewardLogModel.findOne({
      userId: new Types.ObjectId(userId),
      eventId: new Types.ObjectId(eventId),
      eventRuleId: new Types.ObjectId(eventRuleId),
    });

    if (alreadyClaimed) {
      throw new BadRequestException('이미 수령한 보상입니다.');
    }

    // 유저 이벤트 상태 조회
    const userEventState = await this.userEventStateService.findOne({
      userId: new Types.ObjectId(userId),
      eventId: new Types.ObjectId(eventId),
    });

    if (!userEventState) {
      throw new BadRequestException('이벤트 참여 상태가 없습니다.');
    }

    // 이벤트 조건 확인
    const eventRule = await this.eventRuleService.findOne(eventRuleId);
    if (!eventRule) {
      throw new BadRequestException('이벤트 규칙이 없습니다.');
    } else if ( eventRule.conditionType === 'attendance') {
      if (userEventState.progress < eventRule.conditionParams) {
        throw new BadRequestException('출석 조건을 충족하지 못했습니다.');
      }
    } else if (eventRule.conditionType === 'invite') {
      if (userEventState.inviteCount < eventRule.conditionParams) {
        throw new BadRequestException('초대 조건을 충족하지 못했습니다.');
      }
    } else if (eventRule.conditionType === 'ranking') {
      if (userEventState.ranking > eventRule.conditionParams) {
        throw new BadRequestException('랭킹 조건을 충족하지 못했습니다.');
      }
    } else {
      if (userEventState.progress < eventRule.conditionParams) {
        throw new BadRequestException('조건을 충족하지 못했습니다.');
      }
    }
    // 보상 지급 기록 생성
    const createdLog = await this.userRewardLogModel.create({
      userId: new Types.ObjectId(userId),
      eventId: new Types.ObjectId(eventId),
      eventRuleId: new Types.ObjectId(eventRuleId),
      rewardId: new Types.ObjectId(rewardId),
    });

    
    return await this.userRewardLogModel.findById(createdLog._id).populate('rewardId').exec();
  }

  async getUserRewards(userId: string) {
    return await this.userRewardLogModel.find({
      userId: new Types.ObjectId(userId),
    }).populate('rewardId').exec();
  }

  async getAllUserRewards() {
    return await this.userRewardLogModel
      .find()
      .populate('rewardId')
      .exec();
  }

}
