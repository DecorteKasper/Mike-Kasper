import { Injectable } from '@nestjs/common';
import { CreateLifeguardInput } from './dto/create-lifeguard.input';
import { UpdateLifeguardInput } from './dto/update-lifeguard.input';
import { Lifeguard } from './entities/lifeguard.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {ObjectId} from 'mongodb'

@Injectable()
export class LifeguardService {

  constructor(
    @InjectRepository(Lifeguard)
    private readonly lifeguardsRepository: Repository<Lifeguard>,
  ) {}


  create(createLifeguardInput: CreateLifeguardInput): Promise<Lifeguard> {
    const L = new Lifeguard()
    L.name = createLifeguardInput.name
    L.surname = createLifeguardInput.surname
    L.email = createLifeguardInput.email
    L.phoneNumber = createLifeguardInput.phoneNumber
    L.zipCode = createLifeguardInput.zipCode
    L.street = createLifeguardInput.street
    L.numberOfHouse = createLifeguardInput.numberOfHouse
    L.birth = createLifeguardInput.birth

    return this.lifeguardsRepository.save(L)
  }

  findAll(uid?: string) {
    // if (uid) {
    //   return this.lifeguardsRepository.find({ 
    //     where: { id: new ObjectId(uid) },
    //   })
    // } else
     return this.lifeguardsRepository.find()
  }


  findOne(id: string) {
    return `This action returns a #${id} lifeguard`;
  }

  update(id: string, updateLifeguardInput: UpdateLifeguardInput) {
    return `This action updates a #${id} lifeguard`;
  }


  // Function for seeding
  save(lifeguard: Lifeguard[]): Promise<Lifeguard[]> {
    return this.lifeguardsRepository.save(lifeguard)
  }

  truncate(): Promise<void> {
    return this.lifeguardsRepository.clear()
  }

}
