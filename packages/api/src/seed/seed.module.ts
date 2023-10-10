import { Module } from '@nestjs/common';
import { LifeguardModule } from 'src/lifeguard/lifeguard.module';
import { CommandModule } from 'nestjs-command';
import { SeedService } from './seed.service';
import { DatabaseSeedCommand } from './seed.command';


@Module({
    imports: [LifeguardModule, CommandModule],
    providers: [DatabaseSeedCommand, SeedService],
})
export class SeedModule {}
