import { gql } from "@apollo/client";

export const ADD_MONTH = gql`
mutation createMonth($createMonthInput: CreateMonthInput!) {
  createMonth(createMonthInput: $createMonthInput) {
    uid
    months
  }
}
`