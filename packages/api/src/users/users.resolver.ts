import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Role, User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { FirebaseGuard } from 'src/authentication/guards/firebase.guard';
import { FirebaseUser } from 'src/authentication/decorators/user.decorator';
import { UserRecord } from 'firebase-admin/auth';
import { AllowedRoles } from './decorators/role.decorator';
import { RolesGuard } from './guards/roles.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(FirebaseGuard)
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput, @FirebaseUser() user: UserRecord,) {

    // if (user.uid !== createUserInput.uid) {
    //   // This is a security check. The uid of the user that is authenticated in Firebase must match the uid of the user that is being created.
    //   throw new Error('You can only create a user for yourself.')
    //   }
    return this.usersService.create(user.uid, createUserInput);
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput, @FirebaseUser() user: UserRecord,) {
    const updatedUser = await this.usersService.update(user.uid, updateUserInput);
    return updatedUser;
  }


  // @AllowedRoles(Role.HOOFDREDDER)
  @UseGuards(FirebaseGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'userByUid' })
  findOneByUid(@Args('string', { type: () => String }) uid: string) {
    return this.usersService.findOneByUid(uid);
  }

  @Mutation(() => User)
  removeUser(@Args('string', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
