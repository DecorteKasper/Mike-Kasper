import { InputType, Int, Field } from '@nestjs/graphql';
import { isNonNullType } from 'graphql';

@InputType()
export class CreateTodoInput {

  // post field
  @Field(() => Int, { description: 'Post field' })
  post: number;

  // Description field
  @Field(() => String, { description: 'Description field' })
  description: string;

  // status field
  @Field(() => Boolean, { description: 'status field' })
  status: boolean;

  @Field(() => Date, { description: 'create date' })
  createdAt: Date;
}


