import { gql } from "@apollo/client";

export const ADD_REPORT = gql`
mutation createReport($createReportInput: CreateReportInput!) {
  createReport(createReportInput: $createReportInput) {
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
    reddersPost
  }
}
`