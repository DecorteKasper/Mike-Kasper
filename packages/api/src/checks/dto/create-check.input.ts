import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCheckInput {
  @Field(() => Boolean)
  checkMonths: boolean

  @Field(() => Boolean)
  checkHolidays: boolean

  @Field(() => Boolean)
  accessPlatform: boolean
}
