import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

// query current logged in user, if there is one
export const CURRENT_USER_QUERY = gql`
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
      }
    }
  }
`;

// export current logged in user, if none returns 'null'
export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  console.log(data);
  return data?.authenticatedItem;
}
