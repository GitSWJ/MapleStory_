import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AuthTokenService } from './services/auth-token.service';

// 컨트롤러
import { EventGatewayController } from './controllers/event-gateway.controller';
import { AuthGatewayController } from './controllers/auth-gateway.controller';
import { EventRulesGatewayController } from './controllers/event-rules-gateway.controller';
import { RewardGatewayController } from './controllers/reward-gateway.controller';
import { RewardLogGatewayController } from './controllers/reward-log-gateway.controller';
import { EventUserStateGatewayController } from './controllers/event-user-state-gateway.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: 'apps/gateway/.env',
      }),
    HttpModule,
    JwtModule.register({
      secret: "zyUWRbavQ8",
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    EventGatewayController,
    AuthGatewayController,
    EventRulesGatewayController,
    RewardGatewayController,
    RewardLogGatewayController,
    EventUserStateGatewayController,
  ],
  providers: [
    AuthTokenService,
    { 
      provide: APP_GUARD, 
      useClass: RolesGuard 
    },
  ],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
