import { NestFactory } from '@nestjs/core';
import { EventModule } from './event.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(EventModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  
  const port = process.env.PORT || 3002;
  await app.listen(port);
}
bootstrap();
