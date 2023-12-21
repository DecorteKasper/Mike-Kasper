import { gql } from "@apollo/client";

export const ADD_POST = gql`
mutation createPosten($createPostenInput: CreatePostenInput!) {
  createPosten(createPostenInput: $createPostenInput) {
    numberPost
    uidRedderA
    uidRedderB
    uidRedderC
    uidRedderD
    uidRedderE
    uidRedderF
    uidRedderG
    uidRedderH
    uidRedderI
  }
}
`

export const DELETE_ALL_POSTEN = gql`
mutation RemoveAllPosten($ids: [String!]!) {
  removeAllPosten(removeAll: $ids) {
    numberPost
  }
}
`