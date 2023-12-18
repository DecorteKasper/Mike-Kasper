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
import { NotificationsGateway } from 'src/notifications/notifications.gateway';


@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly gateway: NotificationsGateway
  ) { }

  @UseGuards(FirebaseGuard)
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput, @FirebaseUser() user: UserRecord,) {
    return this.usersService.create(createUserInput);
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput, @FirebaseUser() user: UserRecord,) {
    this.gateway.handleUpdateUser(updateUserInput)
    const updatedUser = await this.usersService.update(updateUserInput);
    return updatedUser;
  }

  // @AllowedRoles(Role.HOOFDREDDER)
  @UseGuards(FirebaseGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'userByUid' })
  findOneByUid(@Args('uid', { type: () => String }) uid: string) {
    return this.usersService.findOneByUid(uid);
  }

  // Verwijder een user
  @Mutation(() => User)
  removeUser(@Args('removeuser', { type: () => String }) id: string) {
    this.gateway.handleDeleteUser(id)
    return this.usersService.remove(id);
  }

  // 
  @Mutation(() => [User], { nullable: true })
  async removeAllUsers(@Args('removeAll', { type: () => [String] }) id: string[]) {
    this.gateway.handleDeleteAllUsers(id)
    const users = await this.usersService.removeAll(id);
    return users;
  }

}
