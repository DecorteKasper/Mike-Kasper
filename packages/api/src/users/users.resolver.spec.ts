import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { userStub } from './stubs/users.stub';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { UserRecord } from 'firebase-admin/auth';

import { UsersService } from './users.service';
jest.mock('./users.service');

// "npx jest src/users/users.resolver.spec.ts" -> uitvoeren testen

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let mockedService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersService],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    mockedService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  //Create
  describe('createUser', () => { 
    let myUserDTO: CreateUserInput
    let resultUser: User
    let myUserRecord: UserRecord

    beforeEach(async () => { 
      myUserDTO = {
        name: userStub().name,
        surname: userStub().surname,
        email: userStub().email,
        phoneNumber: userStub().phoneNumber,
        zipCode: userStub().zipCode,
        street: userStub().street,
        numberOfHouse: userStub().numberOfHouse,
        birth: userStub().birth,
        role: userStub().role,
        accessPlatform: userStub().accessPlatform,
        status: userStub().status,
        bathingPlace: userStub().bathingPlace,
        photoURL: userStub().photoURL,
        city: userStub().city
      }
      
      resultUser = await resolver.createUser(myUserDTO, myUserRecord)
    })

    it('should call userService.create one time', async () => { 
      expect(mockedService.create).toHaveBeenCalledTimes(1)
    })

    // it('should call userService.create with the correct parameters', async () => {
    //   expect(mockedService.create).toBeCalledWith(myUserDTO.uid, myUserDTO)
    // })
  });
});
