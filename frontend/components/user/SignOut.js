/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import { Button } from '@mui/material';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut({ children }) {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <Button color="inherit" type="button" onClick={signout}>
      {children}
    </Button>
  );
}
