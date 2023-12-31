import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LifeguardService } from './lifeguard.service';
import { Lifeguard } from './entities/lifeguard.entity';
import { CreateLifeguardInput } from './dto/create-lifeguard.input';
import { UpdateLifeguardInput } from './dto/update-lifeguard.input';
import { FirebaseUser } from '../authentication/decorators/user.decorator';
import { UserRecord } from 'firebase-admin/auth';
import { string } from 'yargs';
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Lifeguard)
export class LifeguardResolver {
  constructor(private readonly lifeguardService: LifeguardService) {}

  @Mutation(() => Lifeguard, { description: 'Create a lifeguard using the DTO.' })
  createLifeguard(@Args('createLifeguardInput') createLifeguardInput: CreateLifeguardInput) : Promise<Lifeguard> {
    return this.lifeguardService.create(createLifeguardInput);
  }


  @UseGuards(FirebaseGuard)
  @Query(() => [Lifeguard], { name: 'lifeguards' })
  findAll(@FirebaseUser() user: UserRecord) {
    return this.lifeguardService.findAll(user.uid);
  }


  @Query(() => Lifeguard, { name: 'lifeguard' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.lifeguardService.findOne(id);
  }

  @Mutation(() => Lifeguard)
  updateLifeguard(@Args('updateLifeguardInput') updateLifeguardInput: UpdateLifeguardInput) {
    return this.lifeguardService.update(updateLifeguardInput.id, updateLifeguardInput);
  }
  
}
