import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Report {

  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectId

  @Column() // Database link - Typeorm
  @Field(() => String)
  uid: string  

  @Column() // Database link - Typeorm
  @Field(() => [String])
  aanwezigen: string[]

  @Column({ nullable: true }) // Database link - Typeorm
  @Field(() => String, {nullable: true})
  vervanging: string

  @Column() // Database link - Typeorm
  @Field(() => String)
  radioKindVerloren: string

  @Column() // Database link - Typeorm
  @Field(() => String)
  radioInterventie: string

  @Column({ nullable: true }) // Database link - Typeorm
  @Field(() => String, {nullable: true})
  textInterventie: string

  @Column() // Database link - Typeorm
  @Field(() => String)
  radioOefening: string

  @Column({ nullable: true }) // Database link - Typeorm
  @Field(() => String, {nullable: true})
  textOefening: string

  @Column() // Database link - Typeorm
  @Field(() => String)
  radioMateriaal: string

  @Column({ nullable: true }) // Database link - Typeorm
  @Field(() => String, {nullable: true})
  textMateriaal: string

  @Column({ nullable: true }) // Database link - Typeorm
  @Field(() => String, {nullable: true})
  extraInfo: string

  @Column() // Database link - Typeorm
  @Field(() => Number)
  reddersPost: number  

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  @Field({ nullable: true })
  createdAt: Date

}
