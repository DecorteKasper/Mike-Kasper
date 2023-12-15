import { Command } from 'nestjs-command'
import { Injectable } from '@nestjs/common'
import { SeedService } from './seed.service'

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  //Users
  @Command({
    command: 'seed:database:users',
    describe: 'seed the database with users',
  })
  async seedUsers() {
    console.log('seeding users...')
    const users = await this.seedService.addUsersFromJson()
    console.log(`${users.length} users created`)
  }

  @Command({
    command: 'seed:reset:users',
    describe: 'delete all users from database',
  })
  async deleteUsers() {
    console.log('deleting users...')
    await this.seedService.deleteAllUsers()
    console.log('users deleted')
  }


  //Holidays
  @Command({
    command: 'seed:database:holidays',
    describe: 'seed the database with holidays',
  })
  async seedHolidays() {
    console.log('seeding holidays...')
    const holidays = await this.seedService.addHolidaysFromJson()
    console.log(`${holidays.length} holidays created`)
  }

  @Command({
    command: 'seed:reset:holidays',
    describe: 'delete all holidays from database',
  })
  async deleteHolidays() {
    console.log('deleting holidays...')
    await this.seedService.deleteAllHolidays()
    console.log('holidays deleted')
  }
}