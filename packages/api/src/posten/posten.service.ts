import { Injectable } from '@nestjs/common';
import { CreatePostenInput } from './dto/create-posten.input';
import { UpdatePostenInput } from './dto/update-posten.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Posten } from './entities/posten.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostenService {

  constructor(
    @InjectRepository(Posten)
    private readonly postenRepository: Repository<Posten>,
  ) {}


  create(createPostenInput: CreatePostenInput): Promise<Posten> {
    const P = new Posten()
    P.namePost = createPostenInput.namePost
    P.nameRedderA = createPostenInput.nameRedderA
    P.nameRedderB = createPostenInput.nameRedderB
    P.nameRedderC = createPostenInput.nameRedderC
    P.nameRedderD = createPostenInput.nameRedderD
    P.nameRedderE = createPostenInput.nameRedderE
    P.nameRedderF = createPostenInput.nameRedderF
    P.nameRedderG = createPostenInput.nameRedderG
    P.nameEhbo1 = createPostenInput.nameEhbo1
    P.nameEhbo2 = createPostenInput.nameEhbo2

    return this.postenRepository.save(P)
  }

  findAll() {
    return this.postenRepository.find()
  }

  findOne(id: string) {
    return `This action returns a #${id} posten`;
  }

  update(id: string, updatePostenInput: UpdatePostenInput) {
    return `This action updates a #${id} posten`;
  }

  remove(id: string) {
    return `This action removes a #${id} posten`;
  }

  //Function for seeding
  save(posten: Posten[]): Promise<Posten[]> {
    return this.postenRepository.save(posten)
  }

  truncate(): Promise<void> {
    return this.postenRepository.clear()
  }
}
