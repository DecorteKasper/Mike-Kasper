import { CreateCheckInput } from './create-check.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCheckInput extends PartialType(CreateCheckInput) {
  @Field(() => String)
  id: string;

  @Field(() => Boolean)
  checkMonths: boolean
  
  @Field(() => Boolean)
  checkHolidays: boolean

  @Field(() => Boolean)
  accessPlatform: boolean
}
