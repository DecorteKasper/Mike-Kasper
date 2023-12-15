import { gql } from "@apollo/client";

export const ALL_RECORDS = gql`
query {
  reports {
    id
    uid
    aanwezigen
    vervanging
    radioKindVerloren
    radioInterventie
    textInterventie
    radioOefening
    textOefening
    radioMateriaal
    textMateriaal
    extraInfo
    status
    reddersPost
    createdAt
  }
}
`