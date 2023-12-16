import { Test, TestingModule } from '@nestjs/testing';
import { ChecksResolver } from './checks.resolver';
import { checkStub } from './stubs/checks.stub';
import { CreateCheckInput } from './dto/create-check.input';
import { Check } from './entities/check.entity';

import { ChecksService } from './checks.service'
jest.mock('./checks.service');

// "npx jest src/checks/checks.resolver.spec.ts" -> uitvoeren testen

describe('ChecksResolver', () => {
  let resolver: ChecksResolver;
  let mockedService: ChecksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChecksResolver, ChecksService],
    }).compile();

    resolver = module.get<ChecksResolver>(ChecksResolver);
    mockedService = module.get<ChecksService>(ChecksService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  //Create
  describe('createCheck', () => {
    let myCheckDTO: CreateCheckInput
    let resultCheck: Check

    beforeEach(async () => { 
      myCheckDTO = {
        checkMonths: checkStub().checkMonths,
        checkHolidays: checkStub().checkHolidays,
        accessPlatform: checkStub().accessPlatform
      }
      resultCheck = await resolver.createCheck(myCheckDTO)
    })

    it('should call checkService.create one time', async () => { 
      expect(mockedService.create).toHaveBeenCalledTimes(1)
    })

    it('should call birdsService.create with the correct parameters', async () => {
      expect(mockedService.create).toBeCalledWith(myCheckDTO)
    })
  })
});
