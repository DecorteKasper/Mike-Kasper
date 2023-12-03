import { Module } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { HolidaysResolver } from './holidays.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Holiday } from './entities/holiday.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Holiday])],
  providers: [HolidaysResolver, HolidaysService],
  exports: [HolidaysService],
})
export class HolidaysModule {}
