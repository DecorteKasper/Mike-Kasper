import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
@ObjectType()
export class Holiday {
  
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectId

  @Column()
  @Field()
  uid: string

  @Column() // Database link - Typeorm
  @Field(() => [String])
  dates: string[]

  @Column()
  @Field(() => Number)
  post: number

  

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt?: Date
}