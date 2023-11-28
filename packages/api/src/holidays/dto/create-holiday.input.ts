import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHolidayInput {  
  @Field(() => String)
  uid: string

  @Field(() => [String])
  dates: string[]
}
