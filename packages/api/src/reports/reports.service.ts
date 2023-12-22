import { Injectable } from '@nestjs/common';
import { CreateReportInput } from './dto/create-report.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Report } from './entities/report.entity';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: MongoRepository<Report>,
  ) { }

  create(createReportInput: CreateReportInput): Promise<Report> {
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
    R.status = false ?? null
    R.reddersPost = createReportInput.reddersPost

    return this.reportsRepository.save(R)
  }

  findAll() {
    return this.reportsRepository.find();
  }

  findOne(id: string) {
    if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId')
    // @ts-ignore
    return this.reportsRepository.findOne({ _id: new ObjectId(id) })
  }


  // update(id: string, updateReportInput: UpdateReportInput) {
  //   return `This action updates a #${id} report`;
  // }

  async remove(id: string) {
    const report = await this.reportsRepository.findOne({ _id: new ObjectId(id) } as any)
    if (report) {
      await this.reportsRepository.remove(report)
      return report
    }
    return null
  }

  async removeAll(ids: string[]) {
    const reports = await this.reportsRepository.find({ where: { _id: { $in: ids.map(id => new ObjectId(id)) } } })
    if (reports) {
      const result = reports.length
      await this.reportsRepository.remove(reports)
      console.log("Deleted:", result)
      return reports
    }
    return null;
  }

  //seeding
  saveAll(reports: Report[]): Promise<Report[]> {
    return this.reportsRepository.save(reports)
  }

  truncate(): Promise<void> {
    return this.reportsRepository.clear()
  }

}
