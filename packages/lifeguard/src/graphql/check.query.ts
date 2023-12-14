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