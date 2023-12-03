import { Injectable } from '@nestjs/common';
import { CreateReportInput } from './dto/create-report.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
  ) {}

  create(createReportInput: CreateReportInput) : Promise<Report> {    
    const R = new Report()
    R.uid = createReportInput.uid
    R.aanwezigen = createReportInput.aanwezigen
    R.vervanging = createReportInput.vervanging ?? null
    R.radioKindVerloren = createReportInput.radioKindVerloren
    R.radioInterventie = createReportInput.radioInterventie
    R.textInterventie = createReportInput.textInterventie ?? null
    R.radioOefening = createReportInput.radioOefening
    R.textOefening = createReportInput.textOefening ?? null
    R.radioMateriaal = createReportInput.radioMateriaal
    R.textMateriaal = createReportInput.textMateriaal ?? null
    R.extraInfo = createReportInput.extraInfo ?? null
    R.reddersPost = createReportInput.reddersPost

    return this.reportsRepository.save(R)
  }

  findAll() {
    return this.reportsRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} report`;
  }

  // update(id: string, updateReportInput: UpdateReportInput) {
  //   return `This action updates a #${id} report`;
  // }

  remove(id: string) {
    return `This action removes a #${id} report`;
  }
}
