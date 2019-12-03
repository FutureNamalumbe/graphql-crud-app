import React from 'react'
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

// Import components
import Home from './components/Home'

// Client Instance
const client = new ApolloClient({
  link: createUploadLink({ uri: '/graphql' }),
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <Home />
  </ApolloProvider>
)

export default App
