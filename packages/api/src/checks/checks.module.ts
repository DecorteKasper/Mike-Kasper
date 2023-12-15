import { Module } from '@nestjs/common';
import { ChecksService } from './checks.service';
import { ChecksResolver } from './checks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Check } from './entities/check.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Check])],
  providers: [ChecksResolver, ChecksService],
  exports: [ChecksService],
})
export class ChecksModule {}
