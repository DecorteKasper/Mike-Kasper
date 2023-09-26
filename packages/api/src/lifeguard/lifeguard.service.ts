import { Injectable } from '@nestjs/common';
import { CreateLifeguardInput } from './dto/create-lifeguard.input';
import { UpdateLifeguardInput } from './dto/update-lifeguard.input';

@Injectable()
export class LifeguardService {
  create(createLifeguardInput: CreateLifeguardInput) {
    return 'This action adds a new lifeguard';
  }

  findAll() {
    return `This action returns all lifeguard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lifeguard`;
  }

  update(id: number, updateLifeguardInput: UpdateLifeguardInput) {
    return `This action updates a #${id} lifeguard`;
  }

  remove(id: number) {
    return `This action removes a #${id} lifeguard`;
  }
}
