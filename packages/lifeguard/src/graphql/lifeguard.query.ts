import gql from 'graphql-tag'

export const ALL_LIFEGUARDS = gql`
query {
  lifeguards {
    name
    surname
    email
  }
}
`