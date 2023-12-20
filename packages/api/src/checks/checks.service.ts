import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckInput } from './dto/create-check.input';
import { UpdateCheckInput } from './dto/update-check.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Check } from './entities/check.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';

@Injectable()
export class ChecksService {

  constructor(
    @InjectRepository(Check)
    private readonly checksRepository: MongoRepository<Check>,
  ) {}


  create(createCheckInput: CreateCheckInput) : Promise<Check> {
    const C = new Check()
    C.checkMonths = createCheckInput.checkMonths
    C.checkHolidays = createCheckInput.checkHolidays
    C.accessPlatform = createCheckInput.accessPlatform

    return this.checksRepository.save(C)
  }

  findOne(id: string) {
    if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId')
    // @ts-ignore
    return this.checksRepository.findOne({ _id: new ObjectId(id) })
  }
    
  async update(updateCheckInput: UpdateCheckInput) {
    const currentCheck = await this.findOne(updateCheckInput.id)
    currentCheck.checkMonths = updateCheckInput.checkMonths ?? currentCheck.checkMonths
    currentCheck.checkHolidays = updateCheckInput.checkHolidays ?? currentCheck.checkHolidays
    return this.checksRepository.save(currentCheck)
  }

  // update(id: string, updateCheckInput: UpdateCheckInput) {
  //   return `This action updates a #${id} check`;
  // }
  // async update(id: string, updateCheckInput: UpdateCheckInput) {
  //   const currentCheck = await this.findOneByUid(uid)

  //   const updateUser = new User()
  //   updateUser.id = currentUser.id
  //   updateUser.uid = uid
  //   updateUser.role = currentUser.role
  //   updateUser.locale = updateUserInput.locale ?? currentUser.locale
  //   updateUser.createdAt = currentUser.createdAt
  //   updateUser.updatedAt = new Date()
  //   return this.userRepository.save(updateUser)
  // }



  findAll() {
    return this.checksRepository.find();
  }

  // findOne(id: string) {
  //   return `This action returns a #${id} check`;
  // }


  remove(id: string) {
    return `This action removes a #${id} check`;
  }

  //seeding
  saveAll(checks: Check[]): Promise<Check[]> {
    return this.checksRepository.save(checks)
  }

  truncate(): Promise<void> {
    return this.checksRepository.clear()
  }
}
