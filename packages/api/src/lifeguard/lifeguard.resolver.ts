import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LifeguardService } from './lifeguard.service';
import { Lifeguard } from './entities/lifeguard.entity';
import { CreateLifeguardInput } from './dto/create-lifeguard.input';
import { UpdateLifeguardInput } from './dto/update-lifeguard.input';

@Resolver(() => Lifeguard)
export class LifeguardResolver {
  constructor(private readonly lifeguardService: LifeguardService) {}

  @Mutation(() => Lifeguard, { description: 'Create a lifeguard using the DTO.' })
  createLifeguard(@Args('createLifeguardInput') createLifeguardInput: CreateLifeguardInput) : Promise<Lifeguard> {
    return this.lifeguardService.create(createLifeguardInput);
  }

  @Query(() => [Lifeguard], { name: 'lifeguard' })
  findAll() {
    return this.lifeguardService.findAll();
  }

  @Query(() => Lifeguard, { name: 'lifeguard' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.lifeguardService.findOne(id);
  }

  @Mutation(() => Lifeguard)
  updateLifeguard(@Args('updateLifeguardInput') updateLifeguardInput: UpdateLifeguardInput) {
    return this.lifeguardService.update(updateLifeguardInput.id, updateLifeguardInput);
  }

  @Mutation(() => Lifeguard)
  removeLifeguard(@Args('id', { type: () => Int }) id: number) {
    return this.lifeguardService.remove(id);
  }
}
