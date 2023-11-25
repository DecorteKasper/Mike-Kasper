import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateReportInput
{
  @Field(() => [String])
  aanwezigen: string[]

  @Field(() => String, { nullable: true })
  vervanging: string

  @Field(() => String)
  radioKindVerloren: string

  @Field(() => String)
  radioInterventie: string

  @Field(() => String, { nullable: true })
  textInterventie: string

  @Field(() => String)
  radioOefening: string

  @Field(() => String, { nullable: true })
  textOefening: string

  @Field(() => String)
  radioMateriaal: string

  @Field(() => String, { nullable: true })
  textMateriaal: string

  @Field(() => String, { nullable: true })
  extraInfo: string

}
