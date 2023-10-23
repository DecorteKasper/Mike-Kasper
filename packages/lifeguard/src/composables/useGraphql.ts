import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    from,
} from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { logErrorMessages } from '@vue/apollo-util'

import useFirebase from './useFirebase'

const { firebaseUser } = useFirebase()


  const httpLink = createHttpLink({
    uri: 'http://[::1]:3000/graphql',
    // uri: import.meta.env.VITE_BACKEND_URL, --> Werkt niet
    credentials: 'same-origin', 
  })

  const errorLink = onError(error => {
    if (import.meta.env.DEV) logErrorMessages(error)
  })

  const authLink = setContext(async (_, { headers }) => ({
    headers: {
      ...headers,
      authorization: firebaseUser.value
        ? `Bearer ${await firebaseUser.value.getIdToken()}`
        : ``,
    },
  }))


  const apolloClient = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  })

  export default () => {
    return {
      apolloClient,
    }
  }
