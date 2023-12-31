import { ObjectType, Field, Int, ID  } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';


@Entity()
@ObjectType()
export class Lifeguard {
  
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  name: string

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  surname: string

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  email: string

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  phoneNumber: number

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  zipCode: number

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  street: string

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  numberOfHouse: number

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  birth: Date

}
