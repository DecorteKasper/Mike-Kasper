import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'todo' })
export class Todo {

  // id field
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Field()
  @Column()
  post: number

  @Field()
  @Column()
  description: string

  @Field()
  @Column()
  status: boolean

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt?: Date
}
