import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLifeguardInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
