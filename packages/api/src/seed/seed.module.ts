import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { SeedService } from './seed.service';
import { DatabaseSeedCommand } from './seed.command';
import { UsersModule } from '../users/users.module';
import { HolidaysModule } from 'src/holidays/holidays.module';
import { MonthsModule } from 'src/months/months.module';
import { ReportsModule } from 'src/reports/reports.module';
import { PostenModule } from 'src/posten/posten.module';
import { ChecksModule } from 'src/checks/checks.module';


@Module({
    imports: [ChecksModule ,PostenModule ,ReportsModule ,MonthsModule ,HolidaysModule, UsersModule, CommandModule],
    providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}