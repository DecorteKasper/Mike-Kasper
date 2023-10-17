import { CreatePostenInput } from './create-posten.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostenInput extends PartialType(CreatePostenInput) {
  @Field(() => String)
  id: string;
}
