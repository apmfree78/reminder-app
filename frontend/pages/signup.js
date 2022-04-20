import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import SignUp from '../components/user/SignUp';

export default function SignUpPage() {
  return (
    <Grid
      container
      justifyContent="center"
      direction="column"
      alignItems="center"
    >
      <h2>Sign Up for Free Today!</h2>
      <SignUp />
    </Grid>
  );
}
