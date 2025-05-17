import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 요청 데이터 유효성 검사용 파이프 적용
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // 포트 설정 (기본값 3000)
  await app.listen(3001);
  console.log(`Auth service is running on: ${await app.getUrl()}`);
}
bootstrap();
