import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { SeedService } from './seed.service';
import { DatabaseSeedCommand } from './seed.command';
import { UsersModule } from '../users/users.module';


@Module({
    imports: [UsersModule, CommandModule],
    providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}