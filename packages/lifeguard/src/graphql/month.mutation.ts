import { gql } from "@apollo/client";

export const ADD_MONTH = gql`
mutation createMonth($createMonthInput: CreateMonthInput!) {
  createMonth(createMonthInput: $createMonthInput) {
    uid
    months
  }
}
`

export const DELETE_ALL_MONTHS = gql`
mutation RemoveAllMonths($uids: [String!]!) {
  removeAllMonths(removeAll: $uids) {
    uid
  }
}
`