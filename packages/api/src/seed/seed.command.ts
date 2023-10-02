import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  @Command({
    command: 'seed:database:lifeguards',
    describe: 'Seed the database with lifeguards',
  })
  async seedLifeguard() {
    console.info('🪺 Start seeding of birds')
    const lifeguards = await this.seedService.addLifeguardFromJson()
    console.info(`🐣 ${lifeguards.length} lifeguards are added.`)
  }

  @Command({
    command: 'seed:reset:lifeguards',
    describe: 'Delete all data from the lifeguards table',
  })
  async delete() {
    console.info('🔪 Start deleting lifeguards')
    await this.seedService.deleteAllLifeguards()
    console.info('🪶 Removed lifeguards')
  }
}