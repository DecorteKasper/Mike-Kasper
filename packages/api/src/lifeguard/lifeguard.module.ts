import { Module } from '@nestjs/common';
import { LifeguardService } from './lifeguard.service';
import { LifeguardResolver } from './lifeguard.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lifeguard } from './entities/lifeguard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lifeguard])],
  providers: [LifeguardResolver, LifeguardService],

  exports : [LifeguardService],
})
export class LifeguardModule {}
