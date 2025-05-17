import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// Controllers
import { EventController } from './controllers/event.controller';
import { EventRuleController } from './controllers/event-rule.controller';

// Services
import { EventService } from './services/event.service';
import { EventRuleService } from './services/event-rule.service';

// Schemas
import { Event, EventSchema } from './schemas/event.schema';
import { EventRule, EventRuleSchema } from './schemas/event-rule.schema';
import { Reward, RewardSchema } from './schemas/reward.schema';
import { UserEventState, UserEventStateSchema } from './schemas/user-event-state.schema';
import { UserRewardLog, UserRewardLogSchema } from './schemas/user-reward-log.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/event/.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/event',
      }),
    }),
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: EventRule.name, schema: EventRuleSchema },
      { name: Reward.name, schema: RewardSchema },
      { name: UserEventState.name, schema: UserEventStateSchema },
      { name: UserRewardLog.name, schema: UserRewardLogSchema },
    ]),
  ],
  controllers: [
    EventController,
    EventRuleController,
    // 필요 시 RewardController 등 추가
  ],
  providers: [
    EventService,
    EventRuleService,
    // 필요 시 RewardService 등 추가
  ],
})
export class EventModule {}
