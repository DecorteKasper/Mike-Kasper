import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Check {

  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectId

  @Column()
  @Field(() => Boolean)
  checkMonths: boolean

  @Column()
  @Field(() => Boolean)
  checkHolidays: boolean

  @Column()
  @Field(() => Boolean)
  accessPlatform: boolean
}
