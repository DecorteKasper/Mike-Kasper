import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Column, ObjectIdColumn } from 'typeorm';

@ObjectType()
export class Posten {
  
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId

  @Column()
  @Field({ nullable: false })
  namePost: string

  @Column()
  @Field({ nullable: false })
  nameRedderA: string

  @Column()
  @Field({ nullable: false })
  nameRedderB: string

  @Column()
  @Field({ nullable: false })
  nameRedderC: string

  @Column()
  @Field({ nullable: false })
  nameRedderD: string

  @Column()
  @Field({ nullable: false })
  nameRedderE: string

  @Column()
  @Field({ nullable: false })
  nameRedderF: string

  @Column()
  @Field({ nullable: false })
  nameRedderG: string

  @Column()
  @Field({ nullable: true })
  nameEhbo1: string

  @Column()
  @Field({ nullable: true })
  nameEhbo2: string
}
