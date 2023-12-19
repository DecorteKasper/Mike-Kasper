import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Posten {

  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectId

  @Column({ nullable: true })
  @Field(() => Number)
  numberPost: number

  @Column()
  @Field(() => String, { nullable: true })
  uidRedderA: string

  @Column()
  @Field(() => String, { nullable: true })
  uidRedderB: string

  @Column()
  @Field(() => String, { nullable: true })
  uidRedderC: string

  @Column()
  @Field(() => String, { nullable: true })
  uidRedderD: string

  @Column()
  @Field(() => String, { nullable: true })
  uidRedderE: string

  @Column()
  @Field(() => String, { nullable: true })
  uidRedderF: string

  @Column()
  @Field(() => String, { nullable: true })
  uidRedderG: string

  @Column()
  @Field(() => String, { nullable: true })
  uidRedderH: string

  @Column()
  @Field(() => String, { nullable: true })
  uidRedderI: string
}
