import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReportsService } from './reports.service';
import { Report } from './entities/report.entity';
import { CreateReportInput } from './dto/create-report.input';

@Resolver(() => Report)
export class ReportsResolver {
  constructor(private readonly reportsService: ReportsService) { }


  @Mutation(() => Report)
  createReport(@Args('createReportInput') createReportInput: CreateReportInput): Promise<Report> {
    return this.reportsService.create(createReportInput);
  }

  @Query(() => [Report], { name: 'reports' })
  findAll() {
    return this.reportsService.findAll();
  }

  @Query(() => Report, { name: 'GetReportById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.reportsService.findOne(id);
  }

  // @Mutation(() => Report)
  // updateReport(@Args('updateReportInput') updateReportInput: UpdateReportInput) {
  //   return this.reportsService.update(updateReportInput.id, updateReportInput);
  // }

  @Mutation(() => Report)
  removeReport(@Args('remove', { type: () => String }) id: string) {
    return this.reportsService.remove(id);
  }

  @Mutation(() => [Report], { nullable: true })
  async removeAllReports(@Args('removeAll', { type: () => [String] }) id: string[]) {
    const reports = await this.reportsService.removeAll(id);
    return reports;
  }
}
