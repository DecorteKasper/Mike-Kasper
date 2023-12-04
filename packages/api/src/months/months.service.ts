import { Injectable } from '@nestjs/common';
import { CreateMonthInput } from './dto/create-month.input';
import { UpdateMonthInput } from './dto/update-month.input';
import { Month } from './entities/month.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MonthsService {

  constructor(
    @InjectRepository(Month)
    private readonly monthsRepository: Repository<Month>,
  ) {}


  create(createMonthInput: CreateMonthInput) : Promise<Month> {
    const M = new Month()
    M.uid = createMonthInput.uid
    M.months = createMonthInput.months

    return this.monthsRepository.save(M)
  }

  findAll() {
    return this.monthsRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} month`;
  }

  findOneByUid(uid: string) {
    return this.monthsRepository.findOneByOrFail({uid});
   }

  update(id: string, updateMonthInput: UpdateMonthInput) {
    return `This action updates a #${id} month`;
  }

  remove(id: string) {
    return `This action removes a #${id} month`;
  }
}
