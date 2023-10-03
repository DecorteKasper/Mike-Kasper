import gql from 'graphql-tag'

export const ALL_LIFEGUARDS = gql`
  query getLifeguards {
    getLifeguards {
      id
      name
      surname
      email
    }
  }
`