import { Injectable } from '@nestjs/common';
import { CreateHolidayInput } from './dto/create-holiday.input';
import { UpdateHolidayInput } from './dto/update-holiday.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Holiday } from './entities/holiday.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HolidaysService {

  constructor(
    @InjectRepository(Holiday)
    private readonly holidaysRepository: Repository<Holiday>,
  ) {}
  
  create(createHolidayInput: CreateHolidayInput) : Promise<Holiday> {
    const H = new Holiday()
    H.uid = createHolidayInput.uid
    H.dates = createHolidayInput.dates
    H.post = createHolidayInput.post

    return this.holidaysRepository.save(H)
  }

  findAll() {
    return this.holidaysRepository.find();
  }

  findOne(id: string) {
    return new Error(`This action returns a #${id} holiday`);
  }

  remove(id: string) {
    return new Error(`This action removes a #${id} holiday`);
  }

  //seeding
  saveAll(holidays: Holiday[]): Promise<Holiday[]> {
    return this.holidaysRepository.save(holidays)
  }

  truncate(): Promise<void> {
    return this.holidaysRepository.clear()
  }
}
