import { gql } from "@apollo/client";

export const ALL_MONTHS = gql`
query {
  months {
    uid
    months
  }
}
`

export const GET_MONTHS_BY_UID = gql`
query monthsByUid($uid: String!) {
  monthsByUid(string: $uid) {
    uid
    months
  }
}
`