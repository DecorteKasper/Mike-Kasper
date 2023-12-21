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
    // user.locale = createUserInput.locale ?? 'nl'
    user.role = createUserInput.role ?? Role.REDDER
    user.name = createUserInput.name
    user.surname = createUserInput.surname
    user.photoURL = createUserInput.photoURL ?? null
    user.email = createUserInput.email
    user.bathingPlace = createUserInput.bathingPlace ?? null
    user.accessPlatform = createUserInput.accessPlatform ?? false
    user.status = createUserInput.status ?? false
    user.phoneNumber = createUserInput.phoneNumber ?? null
    user.zipCode = createUserInput.zipCode ?? null
    user.street = createUserInput.street ?? null
    user.city = createUserInput.city ?? null
    user.numberOfHouse = createUserInput.numberOfHouse ?? null
    user.birth = createUserInput.birth ?? null
    return this.userRepository.save(user)
  }

  async update(updateUserInput: UpdateUserInput) {
    const currentUser = await this.findOneByUid(updateUserInput.uid)
    currentUser.name = updateUserInput.name ?? currentUser.name
    currentUser.surname = updateUserInput.surname ?? currentUser.surname
    currentUser.photoURL = updateUserInput.photoURL ?? currentUser.photoURL
    currentUser.email = updateUserInput.email ?? currentUser.email
    currentUser.phoneNumber = updateUserInput.phoneNumber ?? currentUser.phoneNumber
    currentUser.birth = updateUserInput.birth ?? currentUser.birth
    currentUser.birthPlace = updateUserInput.birthplace ?? currentUser.birthPlace

    currentUser.bathingPlace = updateUserInput.bathingPlace ?? currentUser.bathingPlace
    currentUser.accessPlatform = updateUserInput.accessPlatform ?? false
    currentUser.status = updateUserInput.status ?? false

    currentUser.street = updateUserInput.street ?? currentUser.street
    currentUser.city = updateUserInput.city ?? currentUser.city
    currentUser.numberOfHouse = updateUserInput.numberOfHouse ?? currentUser.numberOfHouse
    currentUser.zipCode = updateUserInput.zipCode ?? currentUser.zipCode

    currentUser.createdAt = currentUser.createdAt
    currentUser.updateAt = new Date()

    return this.userRepository.update({ uid: updateUserInput.uid }, currentUser)
  }

  findOneByUid(uid: string) {
    return this.userRepository.findOneByOrFail({ uid })
  }
  findAll() {
    return this.userRepository.find();
  }

  async findOne(uid: string) {
    const user = await this.userRepository.findOne({ where: { uid } });
    return user;
  }

  async remove(uid: string) {
    const user = await this.userRepository.findOne({ where: { uid } });
    if (user) {
      await this.userRepository.remove(user)
      return user
    }
    return null
  }


  // Remove all users
  async removeAll(ids: string[]) {
    const users = await this.userRepository.find({ where: { uid: { $in: ids } } })
    if (users) {
      const result = users.length
      await this.userRepository.remove(users)
      console.log("Deleted:", result)
      return users
    }
    return null;
  }

  // async remove(id: string) {
  //   const report = await this.reportsRepository.findOne({ _id: new ObjectId(id) } as any)
  //   if (report) {
  //     await this.reportsRepository.remove(report)
  //     return report
  //   }
  //   return null
  // }




  //Function seeding
  saveAll(users: User[]): Promise<User[]> {
    return this.userRepository.save(users)
  }
  truncate(): Promise<void> {
    return this.userRepository.clear()
  }
}
