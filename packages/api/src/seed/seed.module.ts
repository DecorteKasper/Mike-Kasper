import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { SeedService } from './seed.service';
import { DatabaseSeedCommand } from './seed.command';
import { UsersModule } from '../users/users.module';
import { HolidaysModule } from 'src/holidays/holidays.module';


@Module({
    imports: [HolidaysModule, UsersModule, CommandModule],
    providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}