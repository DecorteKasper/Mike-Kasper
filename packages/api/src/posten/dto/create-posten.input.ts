import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostenInput {
  
  @Field(() => Int)
  numberPost: number

  @Field(() => String)
  uidRedderA: string

  @Field(() => String)
  uidRedderB: string

  @Field(() => String)
  uidRedderC: string

  @Field(() => String)
  uidRedderD: string

  @Field(() => String)
  uidRedderE: string

  @Field(() => String)
  uidRedderF: string

  @Field(() => String)
  uidRedderG: string

  @Field(() => String, {nullable: true})
  uidEhbo1?: string

  @Field(() => String, {nullable: true})
  uidEhbo2?: string
}
