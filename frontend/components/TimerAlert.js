/* eslint-disable react/prop-types */
import { Alert, AlertTitle } from '@mui/material';
// import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

// query current logged in user, if there is one
const USER_EMAIL_ALERT = gql`
  mutation USER_EMAIL_ALERT($alert: String!) {
    emailAlert(alert: $alert) {
      id
    }
  }
`;

export default function TimerAlert({ children }) {
  const [sendEmailAlert, { loading }] = useMutation(USER_EMAIL_ALERT, {
    variables: { alert: children },
  });

  if (loading) return 'Loading...';
  // email alert with custom alert message to user
  sendEmailAlert();
  console.log('email sent');

  return (
    <Alert severity="error">
      <AlertTitle>Timer Complete</AlertTitle>
      {children}
    </Alert>
  );
}
