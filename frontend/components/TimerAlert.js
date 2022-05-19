/* eslint-disable react/prop-types */
import { Alert, AlertTitle } from '@mui/material';
// import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

// query current logged in user, if there is one
const USER_EMAIL_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
      }
    }
  }
`;

export default function TimerAlert({ children }) {
  /*   const { data, loading, error } = useQuery(USER_EMAIL_QUERY);
  if (loading) return 'Loading...';
  if (error) return console.error(error);
  console.log(data?.authenticatedItem);

  const { email, name } = data?.authenticatedItem;
 */
  return (
    <Alert severity="error">
      <AlertTitle>Timer Complete</AlertTitle>
      {children}
    </Alert>
  );
}
