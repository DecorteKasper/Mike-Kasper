import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HolidaysService } from './holidays.service';
import { Holiday } from './entities/holiday.entity';
import { CreateHolidayInput } from './dto/create-holiday.input';
import { UpdateHolidayInput } from './dto/update-holiday.input';
import { FirebaseUser } from 'src/authentication/decorators/user.decorator';
import { UserRecord } from 'firebase-admin/auth';

@Resolver(() => Holiday)
export class HolidaysResolver {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Mutation(() => Holiday)
  createHoliday(@Args('createHolidayInput') createHolidayInput: CreateHolidayInput) : Promise<Holiday> {
    return this.holidaysService.create(createHolidayInput);
  }

  @Query(() => [Holiday], { name: 'holidays' })
  findAll() {
    return this.holidaysService.findAll();
  }

  @Query(() => Holiday, { name: 'holiday' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.holidaysService.findOne(id);
  }

  // @Mutation(() => Holiday)
  // updateHoliday(@Args('updateHolidayInput') updateHolidayInput: UpdateHolidayInput) {
  //   return this.holidaysService.update(updateHolidayInput.id, updateHolidayInput);
  // }

  @Mutation(() => Holiday)
  removeHoliday(@Args('id', { type: () => String }) id: string) {
    return this.holidaysService.remove(id);
  }
}
