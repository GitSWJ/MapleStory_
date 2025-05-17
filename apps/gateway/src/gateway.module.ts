import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { EventGatewayController } from './controllers/event-gateway.controller';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthTokenService } from './services/auth-token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_jwt_secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [EventGatewayController],
  providers: [
    AuthTokenService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
