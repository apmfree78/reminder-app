/* eslint-disable react/jsx-props-no-spreading */
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, FormControl, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useForm from '../../lib/useForm';
import Error from '../ErrorMessage';
import EmailPassTemplate from '../../lib/EmailPassTemplate';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refetch currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // send email and pass to graphQL for authentication from backend
    await signup().catch(console.error);
    resetForm();
  };
  // check if there was authentication error

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <Error error={error} />
      <FormControl disabled={loading} sx={{ border: 0, borderStyle: 'hidden' }}>
        <Grid
          container
          justifyContent="center"
          direction="column"
          alignItems="center"
        >
          {data?.createUser && (
            <p>
              Signed up with {data.createUser.email} - Please go ahead and Sign
              In
            </p>
          )}
          <TextField
            required
            autoFocus
            type="text"
            id="name"
            name="name"
            variant="filled"
            color="primary"
            label="Name"
            margin="normal"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
          <EmailPassTemplate {...inputs} handleChange={handleChange} />

          <Button
            type="submit"
            size="large"
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
            sx={{ marginTop: 2, marginBottom: 3, width: 175 }}
          >
            Sign Up
          </Button>
        </Grid>
      </FormControl>
    </form>
  );
}
