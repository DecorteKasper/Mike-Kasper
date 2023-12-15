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


  //Checks
  @Command({
    command: 'seed:database:checks',
    describe: 'seed the database with checks',
  })
  async seedChecks() {
    console.log('seeding checks...')
    const checks = await this.seedService.addChecksFromJson()
    console.log(`${checks.length} checks created`)
  }

  @Command({
    command: 'seed:reset:checks',
    describe: 'delete all checks from database',
  })
  async deleteChecks() {
    console.log('deleting checks...')
    await this.seedService.deleteAllChecks()
    console.log('checks deleted')
  }


  //All
  @Command({
    command: 'seed:database:all',
    describe: 'seed the database with all tables',
  })
  async seedAll() {
    console.log('seeding all...')
    await this.seedService.addUsersFromJson()
    await this.seedService.addHolidaysFromJson()
    await this.seedService.addMonthsFromJson()
    await this.seedService.addReportsFromJson()
    await this.seedService.addPostenFromJson()
    await this.seedService.addChecksFromJson()
    console.log('all seeded')
  }

  @Command({
    command: 'seed:reset:all',
    describe: 'delete all tables from database',
  })
  async deleteAll() {
    console.log('deleting all...')
    await this.seedService.deleteAllUsers()
    await this.seedService.deleteAllHolidays()
    await this.seedService.deleteAllMonths()
    await this.seedService.deleteAllReports()
    await this.seedService.deleteAllPosten()
    await this.seedService.deleteAllChecks()
    console.log('all deleted')
  }
}