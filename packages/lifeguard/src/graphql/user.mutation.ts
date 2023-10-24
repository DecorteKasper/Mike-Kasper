import { gql } from "@apollo/client";

export const ADD_USER = gql`
mutation createUser ($createUserInput: CreateUserInput!){
    createUser(createUserInput: $createUserInput){
      id
      uid
      name
      surname
      email
      phoneNumber
      zipCode
      street
      numberOfHouse
      birth
      locale
      createdAt
    }
  }
`