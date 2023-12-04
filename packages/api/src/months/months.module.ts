import { Module } from '@nestjs/common';
import { MonthsService } from './months.service';
import { MonthsResolver } from './months.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Month } from './entities/month.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Month])],
  providers: [MonthsResolver, MonthsService],
  exports: [MonthsService],
})
export class MonthsModule {}
