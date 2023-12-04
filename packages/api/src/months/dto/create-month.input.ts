import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMonthInput {
  @Field(() => String)
  uid: string

  @Field(() => [String])
  months: string[]
}
