import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/src/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .env 사용
    AuthModule,
  ],
})
export class AppModule {}