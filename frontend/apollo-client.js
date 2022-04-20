import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { endpoint, prodEndpoint } from './config';

const link = createHttpLink({
  uri: endpoint,
  credentials: 'include',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
