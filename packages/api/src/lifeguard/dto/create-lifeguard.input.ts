import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLifeguardInput {
  @Field()
  name: string
}
