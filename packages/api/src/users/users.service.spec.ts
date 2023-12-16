import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { userStub, createUserInputStub } from './stubs/users.stub';

// "npx jest src/users/users.service.spec.ts" -> uitvoeren testen

describe('UsersService', () => {
  let service: UsersService;
  let mockUsersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockResolvedValue(userStub()),
            find: jest.fn().mockResolvedValue([userStub()]),
            findOneByOrFail: jest.fn().mockResolvedValue(userStub()),
          },
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    mockUsersRepository = module.get<Repository<User>>(getRepositoryToken(User),);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  //Create
  describe('create', () => {
    it('should call usersRepository.create one time', async () => {
      const myTestUser = new User();
      const uid = "123456789"
      const saveSpy = jest.spyOn(mockUsersRepository, 'save');
      await service.create(uid, myTestUser);
      expect(saveSpy).toBeCalledTimes(1);
    })

    // it('should call usersRepository.save with the correct prameters', async () => {
    //   const myTestUser: CreateUserInput = createUserInputStub();
    //   const uid = "123456789"
    //   const saveSpy = jest.spyOn(mockUsersRepository, 'save');

    //   await service.create(uid, myTestUser);
    //   expect(saveSpy).toBeCalledWith(myTestUser);
    // })

    it('should return the created user', async () => {
      const myTestUserInput = createUserInputStub();
      const myTestUser = userStub();

      const r = await service.create(myTestUserInput.uid, myTestUserInput)
      expect(r).toEqual(myTestUser)
    })
  })

  //FindAll
  describe('findAll', () => {
    it('should call usersRepository.find one time', async () => {
      const findSpy = jest.spyOn(mockUsersRepository, 'find');
      await service.findAll();
      expect(findSpy).toBeCalledTimes(1);
    })

    it('should return an array of users', async () => {
      const myTestUser = userStub();
      const r = await service.findAll();
      expect(r).toEqual([myTestUser])
    })
  })

  //FindOneByUid
  describe('findOneByUid', () => { 
    it('should call usersRepository.findOneByOrFail one time', async () => {
      const findSpy = jest.spyOn(mockUsersRepository, 'findOneByOrFail');
      await service.findOneByUid("123456789");
      expect(findSpy).toBeCalledTimes(1);
    })

    it('should return the user with the given uid', async () => {
      const myTestUser = userStub();
      const r = await service.findOneByUid("123456789");
      expect(r).toEqual(myTestUser)
    })
  });
});
