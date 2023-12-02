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
    uidEhbo1
    uidEhbo2
  }
}
`