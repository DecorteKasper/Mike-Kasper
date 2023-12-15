import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './entities/user.entity';
import { MongoRepository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) { }


  create(uid: string, createUserInput: CreateUserInput) {
    const user = new User()
    user.uid = uid
    // user.locale = createUserInput.locale ?? 'nl'
    user.role = createUserInput.role ?? Role.REDDER
    user.name = createUserInput.name
    user.surname = createUserInput.surname
    user.photoURL = createUserInput.photoURL ?? null
    user.email = createUserInput.email
    user.bathingPlace = createUserInput.bathingPlace ?? null
    user.phoneNumber = createUserInput.phoneNumber ?? null
    user.zipCode = createUserInput.zipCode ?? null
    user.street = createUserInput.street ?? null
    user.city = createUserInput.city ?? null
    user.numberOfHouse = createUserInput.numberOfHouse ?? null
    user.birth = createUserInput.birth ?? null
    return this.userRepository.save(user)
  }

  async update(uid: string, updateUserInput: UpdateUserInput) {
    const currentUser = await this.findOneByUid(uid)
    const updateUser = new User()
    // user.locale = createUserInput.locale ?? 'nl'
    updateUser.name = updateUserInput.name
    updateUser.surname = updateUserInput.surname
    updateUser.photoURL = updateUserInput.photoURL ?? null
    updateUser.email = updateUserInput.email ?? null
    updateUser.phoneNumber = updateUserInput.phoneNumber ?? null
    updateUser.birth = updateUserInput.birth ?? null
    updateUser.birthPlace = updateUserInput.birthplace ?? null

    updateUser.street = updateUserInput.street ?? null
    updateUser.city = updateUserInput.city ?? null
    updateUser.numberOfHouse = updateUserInput.numberOfHouse ?? null
    updateUser.zipCode = updateUserInput.zipCode ?? null


    updateUser.createdAt = currentUser.createdAt
    updateUser.updateAt = new Date()

    return this.userRepository.update(currentUser, updateUser)
  }
  findOneByUid(uid: string) {
    const user = new User()
    return this.userRepository.findOneByOrFail({ uid })
  }
  findAll() {
    return this.userRepository.find()
  }
  findOne(id: string) {
    return new Error(`This action returns a #${id} user`);
  }

  remove(id: string) {
    return new Error(`This action removes a #${id} user`);
  }


  //Function seeding
  saveAll(users: User[]): Promise<User[]> {
    return this.userRepository.save(users)
  }

  truncate(): Promise<void> {
    return this.userRepository.clear()
  }
}
