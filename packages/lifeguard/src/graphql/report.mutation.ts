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

export const DELETE_REPORT = gql`
mutation RemoveReport($id: String!) {
  removeReport(remove: $id) {
    uid
  }
}
`

export const DELETE_ALL_REPORTS = gql`
mutation RemoveAllReports($ids: [String!]!) {
  removeAllReports(removeAll: $ids) {
    uid
  }
}
`