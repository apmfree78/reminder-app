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
        pomodoros {
          id
          session
          break
          color
          sound
        }
        membership {
          id
          name
        }
        cart {
          id
          quantity
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

// export current logged in user, if none returns 'null'
function useUser() {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  if (loading) return 'Loading...';
  if (error) return console.error(error);
  console.log(data?.authenticatedItem);
  return data?.authenticatedItem;
}
