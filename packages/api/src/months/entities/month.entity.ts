import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Month {

  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectId

  @Column()
  @Field()
  uid: string

  @Column()
  @Field(() => [String])
  months: string[]

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt?: Date
}
