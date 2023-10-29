import { InputType, Field } from '@nestjs/graphql';
import { Role } from '../entities/user.entity';
import { number } from 'yargs';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Optional locale of the current user' })
  locale?: string;

  @Field(() => Number, { description: 'Optional role of the current user' })
  role?: Role;

  @Field(() => String, { description: 'Email address of the current user' })
  email?: string;

  @Field(() => String, { description: 'First name of the current user' })
  name?: string;

  @Field(() => String, { description: 'Last name of the current user' })
  surname?: string;

  @Field(() => String, { description: 'bathing place of the current user' })
  bathingPlace?: string;

  @Field(() => Number, { description: 'phoneNumber of the current user', nullable: true })
  phoneNumber?: number;

  @Field(() => Number, { description: 'Zip code of the current user', nullable: true })
  zipCode?: number;

  @Field(() => String, { description: 'Street name of the current user', nullable: true })
  street?: string;

  @Field(() => Number, { description: 'House number of the current user', nullable: true })
  numberOfHouse?: number;

  @Field(() => Date, { description: 'Birthdate of the current user', nullable: true })
  birth?: Date;
}
