import { gql } from "@apollo/client";

export const ALL_RECORDS = gql`
query {
  reports {
    id
    uid
    radioKindVerloren
    radioInterventie
    textInterventie
    radioOefening
    textOefening
    radioMateriaal
    textMateriaal
    extraInfo
    reddersPost
  }
}
`