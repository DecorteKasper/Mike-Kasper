import { CreateLifeguardInput } from './create-lifeguard.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLifeguardInput extends PartialType(CreateLifeguardInput) {
  @Field(() => String)
  id: string;
}
