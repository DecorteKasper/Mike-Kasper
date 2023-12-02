import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Posten {
  
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectId

  @Column()
  @Field(() => Number)
  numberPost: number

  @Column()
  @Field(() => String)
  uidRedderA: string

  @Column()
  @Field(() => String)
  uidRedderB: string

  @Column()
  @Field(() => String)
  uidRedderC: string

  @Column()
  @Field(() => String)
  uidRedderD: string

  @Column()
  @Field(() => String)
  uidRedderE: string

  @Column()
  @Field(() => String)
  uidRedderF: string

  @Column()
  @Field(() => String)
  uidRedderG: string

  @Column({nullable: true})
  @Field(() => String, { nullable: true })
  uidEhbo1?: string

  @Column({nullable: true})
  @Field(() => String, { nullable: true })
  uidEhbo2?: string
}
