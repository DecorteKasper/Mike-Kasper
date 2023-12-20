import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChecksService } from './checks.service';
import { Check } from './entities/check.entity';
import { CreateCheckInput } from './dto/create-check.input';
import { UpdateCheckInput } from './dto/update-check.input';

@Resolver(() => Check)
export class ChecksResolver {
  constructor(private readonly checksService: ChecksService) {}

  @Mutation(() => Check)
  createCheck(@Args('createCheckInput') createCheckInput: CreateCheckInput) :Promise<Check> {
    return this.checksService.create(createCheckInput);
  }

  @Query(() => [Check], { name: 'checks' })
  findAll() {
    return this.checksService.findAll();
  }
  
  @Mutation(() => Check)
  updateCheck(@Args('updateCheckInput') updateCheckInput: UpdateCheckInput) {
    return this.checksService.update(updateCheckInput);
  }


  @Query(() => Check, { name: 'getCheckById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.checksService.findOne(id);
  }


  @Mutation(() => Check)
  removeCheck(@Args('id', { type: () => String }) id: string) {
    return this.checksService.remove(id);
  }
}
