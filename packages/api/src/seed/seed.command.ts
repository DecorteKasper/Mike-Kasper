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


  //Months
  @Command({
    command: 'seed:database:months',
    describe: 'seed the database with months',
  })
  async seedMonths() {
    console.log('seeding months...')
    const months = await this.seedService.addMonthsFromJson()
    console.log(`${months.length} months created`)
  }

  @Command({
    command: 'seed:reset:months',
    describe: 'delete all months from database',
  })
  async deleteMonths() {
    console.log('deleting months...')
    await this.seedService.deleteAllMonths()
    console.log('months deleted')
  }


  //Reports
  @Command({
    command: 'seed:database:reports',
    describe: 'seed the database with reports',
  })
  async seedReports() {
    console.log('seeding reports...')
    const reports = await this.seedService.addReportsFromJson()
    console.log(`${reports.length} reports created`)
  }

  @Command({
    command: 'seed:reset:reports',
    describe: 'delete all reports from database',
  })
  async deleteReports() {
    console.log('deleting reports...')
    await this.seedService.deleteAllReports()
    console.log('reports deleted')
  }


  //Posten
  @Command({
    command: 'seed:database:posten',
    describe: 'seed the database with posten',
  })
  async seedPosten() {
    console.log('seeding posten...')
    const posten = await this.seedService.addPostenFromJson()
    console.log(`${posten.length} posten created`)
  }

  @Command({
    command: 'seed:reset:posten',
    describe: 'delete all posten from database',
  })
  async deletePosten() {
    console.log('deleting posten...')
    await this.seedService.deleteAllPosten()
    console.log('posten deleted')
  }
}