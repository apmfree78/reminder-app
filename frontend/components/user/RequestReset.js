import { useMutation } from '@apollo/client';
import { Button, Grid, TextField } from '@mui/material';
import gql from 'graphql-tag';
import SendIcon from '@mui/icons-material/Send';
import useForm from '../../lib/useForm';
import Error from '../ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function PasswordReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const [reset, { data, error }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await reset().catch(console.error);
    resetForm();
    // send the email and pass to graphqlAPI
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <Error error={error} />
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <p>Request a Password Reset</p>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check Your email for a link!</p>
        )}
        <TextField
          required
          type="text"
          id="email"
          name="email"
          label="Email"
          placeholder="Your Email Address"
          autoComplete="email"
          value={inputs.email}
          onChange={handleChange}
        />
        <Button
          type="submit"
          size="small"
          variant="contained"
          color="error"
          endIcon={<SendIcon />}
          sx={{ marginTop: 2 }}
        >
          Request Reset
        </Button>
      </Grid>
    </form>
  );
}
