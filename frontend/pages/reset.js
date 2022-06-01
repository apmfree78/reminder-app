/* eslint-disable react/prop-types */
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import RequestReset from '../components/user/RequestReset';
import Reset from '../components/user/Reset';

// reset password page
export default function ResetPage() {
  const { query } = useRouter();

  if (!query?.token) {
    // console.log(query);
    return (
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <h3>You must supply a token</h3>
        <RequestReset />
      </Grid>
    );
  }
  return (
    <div>
      <Reset token={query.token} />
    </div>
  );
}
