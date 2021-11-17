import { ApolloClient, /* createHttpLink */ InMemoryCache, from } from '@apollo/client'
// import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'

const uploadLink = createUploadLink({
  uri: process.env.NEXT_BACKEND_ENDPOINT, // Apollo Server is served from port 8000
  headers: {
    'keep-alive': 'true',
  },
  //   credentials: 'same-origin', // if your backend is a different domain. 'include'
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      if (message === 'UNAUTHENTICATED') {
        client.resetStore()
        client.clearStore()
      }
    })

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    if (networkError.statusCode === 401) {
      client.resetStore()
      client.clearStore()
    }
  }
})

const client = new ApolloClient({
  link: from([errorLink, uploadLink]),
  cache: new InMemoryCache(),
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'cache-and-network',
    },
    mutate: {
      fetchPolicy: 'no-cache',
    },
  },
})

export default client
