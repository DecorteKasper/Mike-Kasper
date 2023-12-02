import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostenService } from './posten.service';
import { Posten } from './entities/posten.entity';
import { CreatePostenInput } from './dto/create-posten.input';
import { UpdatePostenInput } from './dto/update-posten.input';
import { FirebaseUser } from 'src/authentication/decorators/user.decorator';
import { UserRecord } from 'firebase-admin/auth';

@Resolver(() => Posten)
export class PostenResolver {
  constructor(private readonly postenService: PostenService) {}

  @Mutation(() => Posten)
  createPosten(@Args('createPostenInput') createPostenInput: CreatePostenInput) : Promise<Posten> {
    return this.postenService.create(createPostenInput);
  }

  @Query(() => [Posten], { name: 'posten' })
  findAll() {
    return this.postenService.findAll();
  }

  @Query(() => Posten, { name: 'postByNumber' })
  findOneByNumber(@Args('number', { type: () => Number }) numberPost: number) {
    return this.postenService.findOneByNumber(numberPost);
  }

  // @Mutation(() => Posten)
  // updatePosten(@Args('updatePostenInput') updatePostenInput: UpdatePostenInput) {
  //   return this.postenService.update(updatePostenInput.id, updatePostenInput);
  // }

  @Mutation(() => Posten)
  removePosten(@Args('id', { type: () => String }) id: string) {
    return this.postenService.remove(id);
  }
}
