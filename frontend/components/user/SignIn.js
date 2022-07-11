/* eslint-disable react/jsx-props-no-spreading */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Grid } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/router';
import useForm from '../../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from '../ErrorMessage';
import EmailPassTemplate from '../../lib/EmailPassTemplate';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

// sign in user, also passing 'closeForm' as prop that
// will close the pop up form once sign out is complete
export default function SignIn({ closeForm, children }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const router = useRouter();

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // refetch currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send email and pass to graphQL for authentication from backend
    const result = await signin();
    resetForm();
    // if sign in is successful, close pop up and redirect to homepage
    if (
      result.data?.authenticateUserWithPassword.__typename ===
      'UserAuthenticationWithPasswordSuccess'
    ) {
      closeForm();
      router.push({ pathname: '/' });
    }
  };
  // check if there was authentication error
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data.authenticateUserWithPassword
      : undefined;
  return (
    <>
      <form method="POST" onSubmit={handleSubmit}>
        {/* <h2>Sign into Your Account</h2> */}
        <Error error={error} />
        <fieldset disabled={loading}>
          <Grid container justifyContent="center" alignItems="center">
            <EmailPassTemplate {...inputs} handleChange={handleChange} />
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
            >
              Sign In
            </Button>
          </Grid>
        </fieldset>
      </form>
      {children}
    </>
  );
}
