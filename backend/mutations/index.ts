import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import addToCart from './addToCart';
import checkout from './checkout';
import emailAlert from './emailAlert';

// make a fake graphql tagged template literal
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addToCart(membershipId: ID!): CartItem
      checkout(token: String!): Order
      emailAlert(alert: String!): User
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
      checkout,
      emailAlert,
    },
  },
  // resolvers
});
