import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ConfigModule, // ConfigService를 쓰려면 import 해야 함
    JwtModule.registerAsync({
      imports: [ConfigModule], // ConfigService를 DI로 쓰기 위해
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: "zyUWRbavQ8",
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
