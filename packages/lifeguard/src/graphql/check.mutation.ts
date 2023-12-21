import { gql } from "@apollo/client";

export const UPDATE_CHECK = gql`
mutation updateCheck($updateCheckInput: UpdateCheckInput!) {
  updateCheck(updateCheckInput: $updateCheckInput) {
    id
    checkMonths
    checkHolidays
    accessPlatform
  }
}
`