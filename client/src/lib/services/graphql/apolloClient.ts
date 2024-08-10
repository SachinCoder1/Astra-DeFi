// src/apolloClient.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.goldsky.com/api/public/project_clzl0xoo7ac3f01wv28pp1xe4/subgraphs/astradefi/0.0.1/gn',
  }),
  cache: new InMemoryCache(),
});

export default client;
