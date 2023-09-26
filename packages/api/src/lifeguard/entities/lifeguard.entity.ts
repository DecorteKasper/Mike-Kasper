import { ObjectType, Field, Int, ID  } from '@nestjs/graphql';

@ObjectType()
export class Lifeguard {
  @Field(() => ID)
  id: string

  @Field()
  name: string
}
