import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './entities/user.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) { }


  create(uid: string, createUserInput: CreateUserInput) {
    const user = new User()
    user.uid = uid
    user.locale = createUserInput.locale ?? 'nl'
    user.role = createUserInput.role ?? Role.REDDER
    user.name = createUserInput.name
    user.surname = createUserInput.surname
    user.email = createUserInput.email
    user.bathingPlace = createUserInput.bathingPlace ?? null
    user.phoneNumber = createUserInput.phoneNumber ?? null
    user.zipCode = createUserInput.zipCode ?? null
    user.street = createUserInput.street ?? null
    user.numberOfHouse = createUserInput.numberOfHouse ?? null
    user.birth = createUserInput.birth ?? null
    return this.userRepository.save(user)
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: string) {
    return new Error(`This action returns a #${id} user`);
  }

  findOneByUid(uid: string) {
    return this.userRepository.findOneByOrFail({ uid })
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return new Error(`This action updates a #${id} user`);
  }

  remove(id: string) {
    return new Error(`This action removes a #${id} user`);
  }
}
