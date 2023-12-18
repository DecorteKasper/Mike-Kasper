import { gql } from "@apollo/client";

export const ADD_USER = gql`
mutation createUser ($createUserInput: CreateUserInput!){
    createUser(createUserInput: $createUserInput){
      id
      uid
      name
      surname
      email
      bathingPlace
      accessPlatform
      phoneNumber
      zipCode
      street
      numberOfHouse
      birth
      createdAt
    }
  }
`
export const UPDATE_USER = gql`
mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    name
    surname
    photoURL
    phoneNumber
    email
    birth
    birthPlace
    city
    zipCode
    street
    numberOfHouse
  }
}
`
export const DELETE_USER = gql`
mutation RemoveUser($uid: String!) {
  removeUser(removeuser: $uid) {
    name
    surname
  }
}
`
export const DELETE_ALL_USERS = gql`
mutation RemoveAllUsers($uids: [String!]!) {
  removeAllUsers(removeAll: $uids) {
    name
    surname
    uid
  }
}
`