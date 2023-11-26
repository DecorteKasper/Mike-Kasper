import { gql } from "@apollo/client";

export const ALL_HOLIDAYS = gql`
query {
  holidays {
    uid
    dates
  }
}
`