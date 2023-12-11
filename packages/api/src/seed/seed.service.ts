import { Injectable } from '@nestjs/common'
import { LifeguardService } from 'src/lifeguard/lifeguard.service'
import { Lifeguard } from 'src/lifeguard/entities/lifeguard.entity'

import { User } from 'src/users/entities/user.entity'


import * as lifeguards from './data/lifeguards.json'
import * as users from './data/users.json'

@Injectable()
export class SeedService {
  constructor(private readonly seedService: SeedService) {}

  async addLifeguardFromJson(): Promise<Lifeguard[]> {
    let theLifeguards: Lifeguard[] = []
    for (let lifeguard of lifeguards) {
      const L = new Lifeguard()
        L.name = lifeguard.name
        L.surname = lifeguard.surname
        L.email = lifeguard.email
        L.phoneNumber = lifeguard.phoneNumber
        L.zipCode = lifeguard.zipCode
        L.street = lifeguard.street
        L.numberOfHouse = lifeguard.numberOfHouse
        L.birth = new Date(lifeguard.birth)
        theLifeguards.push(L)
    }

    return this.lifeguardsService.save(theLifeguards)
  }

  async deleteAllLifeguards(): Promise<void> {
    return this.lifeguardsService.truncate()
  }

  async addUsersFromJson(): Promise<User[]> 
  {
    let theUsers: User[] = []
    for (let user of users) {
      const U = new User()
        U.name = user.name
        U.surname = user.surname
        U.email = user.email
        U.phoneNumber = user.phoneNumber
        U.zipCode = user.zipCode
        U.street = user.street
        U.numberOfHouse = user.numberOfHouse
        U.birth = new Date(user.birth)
        theUsers.push(U)
    }

    return this.lifeguardsService.save(theUsers)
  }

}