import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MonthsService } from './months.service';
import { Month } from './entities/month.entity';
import { CreateMonthInput } from './dto/create-month.input';
import { UpdateMonthInput } from './dto/update-month.input';

@Resolver(() => Month)
export class MonthsResolver {
  constructor(private readonly monthsService: MonthsService) {}

  @Mutation(() => Month)
  createMonth(@Args('createMonthInput') createMonthInput: CreateMonthInput) :Promise<Month> {
    return this.monthsService.create(createMonthInput);
  }

  @Query(() => [Month], { name: 'months' })
  findAll() {
    return this.monthsService.findAll();
  }

  @Query(() => Month, { name: 'monthsByUid' })
  findOne(@Args('string', { type: () => String }) uid: string) {
    return this.monthsService.findOneByUid(uid);
  }

  // @Mutation(() => Month)
  // updateMonth(@Args('updateMonthInput') updateMonthInput: UpdateMonthInput) {
  //   return this.monthsService.update(updateMonthInput.id, updateMonthInput);
  // }

  @Mutation(() => Month)
  removeMonth(@Args('string', { type: () => String }) id: string) {
    return this.monthsService.remove(id);
  }
}
