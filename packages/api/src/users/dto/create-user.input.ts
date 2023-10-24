import { InputType, Field } from '@nestjs/graphql';
import { Role } from '../entities/user.entity';
import { number } from 'yargs';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Optional locale of the current user' })
  locale?: string;
  

  @Field(() => Number, { description: 'Optional role of the current user' })
  role?: Role;

  @Field(() => String, { description: 'Optional uid of the current user' })
  email: string;

  @Field(() => String, { description: 'Optional uid of the current user' })
  name: string;

  @Field(() => String, { description: 'Optional uid of the current user' })
  surname: string;

  
}
