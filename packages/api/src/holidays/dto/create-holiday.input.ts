import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHolidayInput {  

  @Field(() => [String], { description: 'All the dates the user won\'t be working' })
  dates: string[]
}
