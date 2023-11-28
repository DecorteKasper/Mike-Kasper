import { gql } from "@apollo/client";

export const ADD_HOLIDAY = gql`
mutation createHoliday($createHolidayInput: CreateHolidayInput!) {
  createHoliday(createHolidayInput: $createHolidayInput) {
    uid
    dates
  }
}
`