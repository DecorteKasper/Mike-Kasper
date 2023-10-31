import gql from 'graphql-tag'

export const GET_USER_BY_UID = gql`
query userByUid($uid: String!) {
  userByUid(string: $uid) {
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
    role
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
    phoneNumber
    zipCode
    street
    numberOfHouse
    birth
  }
}

`