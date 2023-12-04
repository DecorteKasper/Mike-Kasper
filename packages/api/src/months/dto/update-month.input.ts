import { CreateMonthInput } from './create-month.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMonthInput extends PartialType(CreateMonthInput) {
  @Field(() => Int)
  id: number;
}
