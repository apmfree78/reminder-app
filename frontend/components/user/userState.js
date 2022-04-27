/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

// query current logged in user, if there is one
const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        reminders {
          id
          time
          label
          alert
          color
          sound
        }
        membership {
          name
        }
        cart {
          membership {
            id
            name
            price
          }
        }
      }
    }
  }
`;

const UserStateContent = createContext();
const UserStateProvider = UserStateContent.Provider;

function UserProvider({ children }) {
  // This is our own custom provider!
  // We will store data (state) and functionality (updaters) in here
  // and anyone can access it via the consumer!

  // query current user
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

  if (loading) return 'Loading...';
  if (error) return console.error(error);
  // console.log(memberData?.authenticatedItem);
  const user = data?.authenticatedItem;
  // const memberInfo = memberData?.authenticatedItem;

  function hasCartItem() {
    return user?.cart[0]?.membership;
  }
  function membershipStatus() {
    return user?.membership.name;
  }

  return (
    <UserStateProvider value={{ user, hasCartItem, membershipStatus }}>
      {children}
    </UserStateProvider>
  );
}

// make a custom hook for accessing the cart local state
function useUser() {
  // we use a consumer here to access the local state
  const all = useContext(UserStateContent);
  return all;
}
export { UserProvider, useUser };
