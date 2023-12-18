import gql from 'graphql-tag'

export const GET_USER_BY_UID = gql`
query userByUid($uid: String!) {
  userByUid(uid: $uid) {
    id
    uid
    name
    surname
    email
    phoneNumber
    zipCode
    street
    numberOfHouse
    accessPlatform
    birth
    role
    bathingPlace
    createdAt
    updateAt
  }
}
`
export const GET_USERS = gql` 
query {
  users {
    uid
    name
    surname
    role
    email
    bathingPlace
    accessPlatform
    phoneNumber
    zipCode
    street
    numberOfHouse
    birth
  }
}

`