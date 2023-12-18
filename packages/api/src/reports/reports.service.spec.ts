import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from './reports.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportInput } from './dto/create-report.input';
import { reportStub, createReportInputStub } from './stubs/reports.stub';

// "npx jest src/reports/reports.service.spec.ts" -> uitvoeren testen

describe('ReportsService', () => {
  let service: ReportsService;
  let mockReportsRepository: Repository<Report>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(Report),
          useValue: {
            save: jest.fn().mockResolvedValue(reportStub()),
            find: jest.fn().mockResolvedValue([reportStub()]),
            findOne: jest.fn().mockResolvedValue(reportStub()),
          },
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
    mockReportsRepository = module.get<Repository<Report>>(getRepositoryToken(Report),);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  //Create
  describe('create', () => { 
    it('should call reportsRepository.create one time', async () => {
      const myTestReport = new Report();
      const saveSpy = jest.spyOn(mockReportsRepository, 'save');
      await service.create(myTestReport);
      expect(saveSpy).toBeCalledTimes(1);
    })

    it('should call reportsRepository.save with the correct prameters', async () => {
      const myTestReport: CreateReportInput = createReportInputStub();
      const saveSpy = jest.spyOn(mockReportsRepository, 'save');

      await service.create(myTestReport);
      expect(saveSpy).toBeCalledWith(myTestReport);
    })

    it('should return the created report', async () => {
      const myTestReportInput = createReportInputStub();
      const myTestReport = reportStub();

      const r = await service.create(myTestReportInput)
      expect(r).toEqual(myTestReport);
    })
  });

  //FindAll
  describe('findAll', () => {
    it('should call reportsRepository.find one time', async () => {
      const findSpy = jest.spyOn(mockReportsRepository, 'find');
      await service.findAll();
      expect(findSpy).toBeCalledTimes(1);
    })

    it('should return an array of reports', async () => {
      const myTestReport = reportStub();
      const r = await service.findAll();
      expect(r).toEqual([myTestReport]);
    })
  });

});
