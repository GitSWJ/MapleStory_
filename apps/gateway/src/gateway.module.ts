import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { EventGatewayController } from './controllers/event-gateway.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthTokenService } from './services/auth-token.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [EventGatewayController],
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
