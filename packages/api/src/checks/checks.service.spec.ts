import { Test, TestingModule } from '@nestjs/testing';
import { ChecksService } from './checks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Check } from './entities/check.entity';
import { CreateCheckInput } from './dto/create-check.input';
import { checkStub, CreateCheckInputStub } from './stubs/checks.stub';

// "npx jest src/checks/checks.service.spec.ts" -> uitvoeren testen

describe('ChecksService', () => {
  let service: ChecksService;
  let mockChecksRepository: Repository<Check>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChecksService,
        {
          provide: getRepositoryToken(Check),
          useValue: {
            save: jest.fn().mockResolvedValue(checkStub()),
            find: jest.fn().mockResolvedValue([checkStub()]),
          },
        },
      ],
    }).compile();

    service = module.get<ChecksService>(ChecksService);
    mockChecksRepository = module.get<Repository<Check>>(getRepositoryToken(Check),);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  //Create
  describe('create', () => {
    it('should call checksRepository.create one time', async () => {
      const myTestCheck = new Check();
      const saveSpy = jest.spyOn(mockChecksRepository, 'save');
      await service.create(myTestCheck);
      expect(saveSpy).toBeCalledTimes(1);
    })

    it('should call checksRepository.save with the correct prameters', async () => {
      const myTestCheck: CreateCheckInput = CreateCheckInputStub();
      const saveSpy = jest.spyOn(mockChecksRepository, 'save');

      await service.create(myTestCheck);
      expect(saveSpy).toBeCalledWith(myTestCheck);
    })

    it('should return the created check', async () => {
      const myTestCheckInput = CreateCheckInputStub();
      const myTestCheck = checkStub();

      const r = await service.create(myTestCheckInput)
      expect(r).toEqual(myTestCheck)
    })
  })

  //Find
  describe('findAll', () => { 
    it('should call checksRepository.find one time', async () => {
      const findSpy = jest.spyOn(mockChecksRepository, 'find');
      await service.findAll();
      expect(findSpy).toBeCalledTimes(1);
    })

    it('should return an array of checks', async () => {
      const myTestCheck = checkStub();
      const r = await service.findAll();
      expect(r).toEqual([myTestCheck]);
    })
  });
});
