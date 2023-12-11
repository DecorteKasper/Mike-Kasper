import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Report } from './report.entity';

@ObjectType()
export class DeleteReportsResponse {
  @Field(() => Int)
  deletedCount: number;

  @Field(() => [Report], { nullable: true })
  deletedReports?: Report[];

  @Field(() => String)
  message: string;
}
