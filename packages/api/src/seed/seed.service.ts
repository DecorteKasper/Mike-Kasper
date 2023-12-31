import { Injectable } from '@nestjs/common'

import { UsersService } from 'src/users/users.service'
import { HolidaysService } from 'src/holidays/holidays.service'
import { MonthsService } from 'src/months/months.service'
import { ReportsService } from 'src/reports/reports.service'
import { PostenService } from 'src/posten/posten.service'
import { ChecksService } from 'src/checks/checks.service'

import { User } from 'src/users/entities/user.entity'
import { Holiday } from 'src/holidays/entities/holiday.entity'
import { Month } from 'src/months/entities/month.entity'
import { Report } from 'src/reports/entities/report.entity'
import { Posten } from 'src/posten/entities/posten.entity'
import { Check } from 'src/checks/entities/check.entity'

import * as users from './data/users.json'
import * as holidays from './data/holidays.json'
import * as months from './data/months.json'
import * as reports from './data/reports.json'
import * as posten from './data/posten.json'
import * as checks from './data/checks.json'


@Injectable()
export class SeedService {
  constructor(
    private usersService: UsersService,
    private holidaysService: HolidaysService,
    private monthsService: MonthsService,
    private reportsService: ReportsService,
    private postenService: PostenService,
    private checksService: ChecksService,
  ) { }

  //Users
  async addUsersFromJson() { 
    let theUsers: User[] = []

    for (let user of users) {
      const u = new User()
      u.uid = user.uid
      u.name = user.name
      u.surname = user.surname
      u.email = user.email
      u.phoneNumber = user.phoneNumber
      u.zipCode = user.zipCode
      u.street = user.street
      u.numberOfHouse = user.numberOfHouse
      u.birth = user.birth
      u.role = user.role
      u.accessPlatform = user.accessPlatform
      u.status = user.status
      u.bathingPlace = user.bathingPlace
      u.photoURL = user.photoURL
      u.city = user.city

      theUsers.push(u)
    }

    try {
      return await this.usersService.saveAll(theUsers)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteAllUsers(): Promise<void> {
    return this.usersService.truncate()
  }


  //Holidays
  async addHolidaysFromJson() {
    let theHolidays: Holiday[] = []

    for (let holiday of holidays) {
      const h = new Holiday()
      h.uid = holiday.uid
      h.dates = holiday.dates
      h.post = holiday.post

      theHolidays.push(h)
    }

    try {
      return await this.holidaysService.saveAll(theHolidays)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteAllHolidays(): Promise<void> {
    return this.holidaysService.truncate()
  }

  //Months
  async addMonthsFromJson() {
    let theMonths: Month[] = []

    for (let month of months) {
      const m = new Month()
      m.uid = month.uid
      m.months = month.months

      theMonths.push(m)
    }

    try {
      return await this.monthsService.saveAll(theMonths)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteAllMonths(): Promise<void> {
    return this.monthsService.truncate()
  }


  //Reports
  async addReportsFromJson() {
    let theReports: Report[] = []

    for (let report of reports) {
      const r = new Report()
      r.uid = report.uid
      r.aanwezigen = report.aanwezigen
      r.vervanging = report.vervanging ?? null
      r.radioKindVerloren = report.radioKindVerloren
      r.radioInterventie = report.radioInterventie
      r.textInterventie = report.textInterventie ?? null
      r.radioOefening = report.radioOefening
      r.textOefening = report.textOefening ?? null
      r.radioMateriaal = report.radioMateriaal
      r.textMateriaal = report.textMateriaal ?? null
      r.extraInfo = report.extraInfo ?? null
      r.reddersPost = report.reddersPost
      r.status = report.status

      theReports.push(r)
    }

    try {
      return await this.reportsService.saveAll(theReports)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteAllReports(): Promise<void> {
    return this.reportsService.truncate()
  }

  //Posten
  async addPostenFromJson() {
    let thePosten: Posten[] = []

    for (let post of posten) {
      const p = new Posten()
      p.numberPost = post.numberPost
      p.uidRedderA = post.uidRedderA
      p.uidRedderB = post.uidRedderB
      p.uidRedderC = post.uidRedderC
      p.uidRedderD = post.uidRedderD
      p.uidRedderE = post.uidRedderE
      p.uidRedderF = post.uidRedderF
      p.uidRedderG = post.uidRedderG
      p.uidRedderH = post.uidRedderH ?? null
      p.uidRedderI = post.uidRedderI ?? null

      thePosten.push(p)
    }

    try {
      return await this.postenService.saveAll(thePosten)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteAllPosten(): Promise<void> {
    return this.postenService.truncate()
  }

  //Checks
  async addChecksFromJson() {
    let theChecks: Check[] = []

    for (let check of checks) {
      const c = new Check()
      c.checkMonths = check.checkMonths
      c.checkHolidays = check.checkHolidays
      c.accessPlatform = check.accessPlatform

      theChecks.push(c)
    }

    try {
      return await this.checksService.saveAll(theChecks)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteAllChecks(): Promise<void> {
    return this.checksService.truncate()
  }

}