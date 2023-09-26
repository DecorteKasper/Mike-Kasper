import { Module } from '@nestjs/common';
import { LifeguardService } from './lifeguard.service';
import { LifeguardResolver } from './lifeguard.resolver';

@Module({
  providers: [LifeguardResolver, LifeguardService],
})
export class LifeguardModule {}
