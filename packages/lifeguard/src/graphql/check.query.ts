import { gql } from "@apollo/client";

export const ALL_CHECKS = gql`
query {
  checks {
    checkMonths
    checkHolidays
    accessPlatform
  }
}
`

export const FIND_ONE_CHECK_BY_ID = gql`
query getCheckById($id: String!){
  getCheckById(id: $id) {
    checkMonths
    checkHolidays
  }
}
`