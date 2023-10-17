import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostenInput {
  
  @Field()
  namePost: string

  @Field()
  nameRedderA: string

  @Field()
  nameRedderB: string

  @Field()
  nameRedderC: string

  @Field()
  nameRedderD: string

  @Field()
  nameRedderE: string

  @Field()
  nameRedderF: string

  @Field()
  nameRedderG: string

  @Field()
  nameEhbo1: string

  @Field()
  nameEhbo2: string
}
