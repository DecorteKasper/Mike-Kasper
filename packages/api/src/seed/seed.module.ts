import { Module } from '@nestjs/common';
import { LifeguardModule } from 'src/lifeguard/lifeguard.module';
import { CommandModule } from 'nestjs-command';
import { SeedService } from './seed.service';
import { DatabaseSeedCommand } from './seed.command';
import { UsersModule } from 'src/users/users.module';


@Module({
    imports: [LifeguardModule, CommandModule, UsersModule],
    providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}
