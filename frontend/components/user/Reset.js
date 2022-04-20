/* eslint-disable react/jsx-props-no-spreading */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useForm from '../../lib/useForm';
import Error from '../ErrorMessage';
import EmailPassTemplate from '../../lib/EmailPassTemplate';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });
  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data.redeemUserPasswordResetToken
    : undefined;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await reset().catch(console.error);
    resetForm();
    // send the email and pass to graphqlAPI
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <h2>Reset Your Password</h2>
        <Error error={error || successfulError} />

        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in with your new password!</p>
        )}
        <EmailPassTemplate {...inputs} handleChange={handleChange} />
        <Button
          type="submit"
          size="small"
          variant="contained"
          color="error"
          endIcon={<SendIcon />}
          sx={{ marginTop: 2 }}
        >
          Reset Password
        </Button>
      </Grid>
    </form>
  );
}
