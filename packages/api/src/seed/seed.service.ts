import { Injectable } from '@nestjs/common'

import { UsersService } from 'src/users/users.service'

import { User } from 'src/users/entities/user.entity'

import * as users from './data/users.json'

@Injectable()
export class SeedService {
  constructor(
    private usersService: UsersService
  ) { }

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


}