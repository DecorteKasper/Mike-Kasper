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
  ) { }


  create(createPostenInput: CreatePostenInput): Promise<Posten> {
    const P = new Posten()
    P.numberPost = createPostenInput.numberPost
    P.uidRedderA = createPostenInput.uidRedderA ?? null
    P.uidRedderB = createPostenInput.uidRedderB ?? null
    P.uidRedderC = createPostenInput.uidRedderC ?? null
    P.uidRedderD = createPostenInput.uidRedderD ?? null
    P.uidRedderE = createPostenInput.uidRedderE ?? null
    P.uidRedderF = createPostenInput.uidRedderF ?? null
    P.uidRedderG = createPostenInput.uidRedderG ?? null
    P.uidRedderH = createPostenInput.uidRedderH ?? null
    P.uidRedderI = createPostenInput.uidRedderI ?? null

    return this.postenRepository.save(P)
  }

  findAll() {
    return this.postenRepository.find()
  }

  findOne(id: string) {
    return `This action returns a #${id} posten`;
  }

  findOneByNumber(numberPost: number) {
    return this.postenRepository.findOneByOrFail({ numberPost });
  }


  update(id: string, updatePostenInput: UpdatePostenInput) {
    return `This action updates a #${id} posten`;
  }

  remove(id: string) {
    return `This action removes a #${id} posten`;
  }

  //Function for seeding
  saveAll(posten: Posten[]): Promise<Posten[]> {
    return this.postenRepository.save(posten)
  }

  truncate(): Promise<void> {
    return this.postenRepository.clear()
  }
}
