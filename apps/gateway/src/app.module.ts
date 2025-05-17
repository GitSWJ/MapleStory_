import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EventController } from './event/event.controller';
import { ProxyService } from './proxy/proxy.service';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [HttpModule],
  controllers: [EventController],
  providers: [ProxyService, AuthGuard],
})
export class AppModule {}
