import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLifeguardInput {

  @Field()
  name: string

  @Field()
  surname: string

  @Field()
  email: string

  @Field()
  phoneNumber: number

  @Field()
  zipCode: number

  @Field()
  street: string

  @Field()
  numberOfHouse: number

  @Field()
  birth: Date
}
