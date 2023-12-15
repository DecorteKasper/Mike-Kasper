import { Injectable } from '@nestjs/common'

import { UsersService } from 'src/users/users.service'
import { HolidaysService } from 'src/holidays/holidays.service'

import { User } from 'src/users/entities/user.entity'
import { Holiday } from 'src/holidays/entities/holiday.entity'

import * as users from './data/users.json'
import * as holidays from './data/holidays.json'

@Injectable()
export class SeedService {
  constructor(
    private usersService: UsersService,
    private holidaysService: HolidaysService
  ) { }

  //Users
  async addUsersFromJson() { 
    let theUsers: User[] = []

    for (let user of users) {
      const u = new User()
      u.name = user.name
      u.surname = user.surname
      u.email = user.email
      u.phoneNumber = user.phoneNumber
      u.zipCode = user.zipCode
      u.street = user.street
      u.numberOfHouse = user.numberOfHouse
      u.birth = user.birth
      u.role = user.role
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


}