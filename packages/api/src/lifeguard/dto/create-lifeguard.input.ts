import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLifeguardInput {

  @Field()
  name: string

  @Field()
  surname: string

  @Field()
  email: string

  @Field(() => Int, { nullable: true })
  phoneNumber: number

  @Field(() => Int, { nullable: true })
  zipCode: number

  @Field(() => String, { nullable: true })
  street: string

  @Field(() => Int, { nullable: true })
  numberOfHouse: number

  @Field(() => Date, { nullable: true })
  birth: Date
}
