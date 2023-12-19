import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostenInput {

  @Field(() => Number, { nullable: true })
  numberPost: number

  @Field(() => String, { nullable: true })
  uidRedderA?: string

  @Field(() => String, { nullable: true })
  uidRedderB?: string

  @Field(() => String, { nullable: true })
  uidRedderC?: string

  @Field(() => String, { nullable: true })
  uidRedderD?: string

  @Field(() => String, { nullable: true })
  uidRedderE?: string

  @Field(() => String, { nullable: true })
  uidRedderF?: string

  @Field(() => String, { nullable: true })
  uidRedderG?: string

  @Field(() => String, { nullable: true })
  uidRedderH?: string

  @Field(() => String, { nullable: true })
  uidRedderI?: string
}
