import { Test, TestingModule } from '@nestjs/testing';
import { ReportsResolver } from './reports.resolver';
import { reportStub } from './stubs/reports.stub';
import { CreateReportInput } from './dto/create-report.input';
import { Report } from './entities/report.entity';

import { ReportsService } from './reports.service';
jest.mock('./reports.service');

// "npx jest src/reports/reports.resolver.spec.ts" -> uitvoeren testen

describe('ReportsResolver', () => {
  let resolver: ReportsResolver;
  let mockedService: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportsResolver, ReportsService],
    }).compile();

    resolver = module.get<ReportsResolver>(ReportsResolver);
    mockedService = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  //Create
  describe('createReport', () => {
    let myReportDTO: CreateReportInput
    let resultReport: Report

    beforeEach(async () => { 
      myReportDTO = {
        uid: reportStub().uid,
        aanwezigen: reportStub().aanwezigen,
        vervanging: reportStub().vervanging,
        radioKindVerloren: reportStub().radioKindVerloren,
        radioInterventie: reportStub().radioInterventie,
        textInterventie: reportStub().textInterventie,
        radioOefening: reportStub().radioOefening,
        textOefening: reportStub().textOefening,
        radioMateriaal: reportStub().radioMateriaal,
        textMateriaal: reportStub().textMateriaal,
        extraInfo: reportStub().extraInfo,
        status: reportStub().status,
        reddersPost: reportStub().reddersPost,
      }
      resultReport = await resolver.createReport(myReportDTO)
    })

    it('should call reportService.create one time', async () => { 
      expect(mockedService.create).toHaveBeenCalledTimes(1)
    })

    it('should call birdsService.create with the correct parameters', async () => {
      expect(mockedService.create).toBeCalledWith(myReportDTO)
    })
  })

});
