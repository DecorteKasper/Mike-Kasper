import { gql } from '@apollo/client';

export const ADD_LIFEGUARD = gql`
mutation createLifeguard($createLifeguardInput: CreateLifeguardInput!) {
    createLifeguard(createLifeguardInput: $createLifeguardInput) {
      id
      name
      surname
      email
    }
  }
`