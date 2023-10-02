import { Injectable } from '@nestjs/common'
import { LifeguardService } from 'src/lifeguard/lifeguard.service'
import { Lifeguard } from 'src/lifeguard/entities/lifeguard.entity'

import * as lifeguards from './data/lifeguards.json'

@Injectable()
export class SeedService {
  constructor(private lifeguardsService: LifeguardService) {}

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
}