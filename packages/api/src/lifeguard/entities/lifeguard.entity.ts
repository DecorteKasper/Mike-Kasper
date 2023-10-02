import { ObjectType, Field, Int, ID  } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';


@Entity()
@ObjectType()
export class Lifeguard {

  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column() // Database link - Typeorm
  @Field()
  name: string

  @Column() // Database link - Typeorm
  @Field()
  surname: string

  @Column() // Database link - Typeorm
  @Field()
  email: string

  @Column() // Database link - Typeorm
  @Field()
  phoneNumber: number

  @Column() // Database link - Typeorm
  @Field()
  zipCode: number

  @Column() // Database link - Typeorm
  @Field()
  street: string

  @Column() // Database link - Typeorm
  @Field()
  numberOfHouse: number

  @Column() // Database link - Typeorm
  @Field()
  birth: Date

}
