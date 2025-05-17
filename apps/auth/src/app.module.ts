import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth.module'; // 인증 관련 모듈

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // 전역 환경변수 모듈 설정
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI), // 환경변수로부터 MongoDB 연결 URI
    AuthModule,  // 인증 관련 모듈
  ],
})
export class AppModule { }
