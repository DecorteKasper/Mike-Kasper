import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

export enum Role {
  HOOFDREDDER = 300,
  REDDER = 200,
  EHBO = 100,
}

@Entity()
@ObjectType()
export class User {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  uid: string

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  name: string

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  surname: string

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  photoURL: string

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
  city: string

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  street: string

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  numberOfHouse: number

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  birth: Date

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  birthPlace: string

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  accessPlatform: boolean

  @Column() // Database link - Typeorm
  @Field({ nullable: true })
  status: boolean

  @Column()
  @Field({ nullable: true })
  bathingPlace?: string

  @Column({ type: Number, default: Role.REDDER })
  @Field(() => Number, { nullable: true })
  role: Role

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  updateAt?: Date
}