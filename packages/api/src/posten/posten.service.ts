import { Injectable } from '@nestjs/common';
import { CreatePostenInput } from './dto/create-posten.input';
import { UpdatePostenInput } from './dto/update-posten.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Posten } from './entities/posten.entity';
import { Repository, MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';


@Injectable()
export class PostenService {

  constructor(
    @InjectRepository(Posten)
    private readonly postenRepository: MongoRepository<Posten>,
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

  findOneByNumber(numberPost: number) {
    return this.postenRepository.findOneByOrFail({ numberPost });
  }

  // Find one by id
  FindOneById(id: string) {
    if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId')
    // @ts-ignore
    return this.postenRepository.findOne({ _id: new ObjectId(id) })
  }

  // removeAllPosten
  async removeAllPosten(ids: string[]) {
    const posten = await this.postenRepository.find({ where: { _id: { $in: ids.map(id => new ObjectId(id)) } } })
    if (posten) {
      const result = posten.length
      await this.postenRepository.remove(posten)
      console.log("Deleted:", result)
      return posten
    }
    return null;
  }







  // findPostById(id: string)

  findAll() {
    return this.postenRepository.find();
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
