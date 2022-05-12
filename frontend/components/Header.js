import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import _ from 'lodash';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { CURRENT_USER_QUERY } from './user/User';
import SignOut from './user/SignOut';
import ModalTemplate from '../lib/ModalTemplate';
import SignIn from './user/SignIn';
import PasswordReset from './user/RequestReset';

// Blue Appbar Header you see at the top
export default function Header() {
  // show sign in modal pop up ?
  const [signIn, showSignIn] = useState(false);
  // query for current user
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
  // checking loading state and for errors
  if (loading) return <p>Loading...</p>;
  if (error) return console.error(error);
  // extracting user info and membership level from database query
  const user = data?.authenticatedItem;
  const membershipLevel = user?.membership?.name;

  return (
    <AppBar position="static">
      {/* show sign in modal pop up if user clicked on sign in link  */}
      {signIn ? (
        <ModalTemplate
          open={signIn}
          setOpen={showSignIn}
          message="Sign In to Your Account"
        >
          <SignIn>
            <PasswordReset />
          </SignIn>
        </ModalTemplate>
      ) : (
        ''
      )}
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 'bold', flexGrow: 1 }}
          >
            REMINDER
          </Typography>
        </Link>
        {!user ? (
          <>
            <Button color="inherit" onClick={() => showSignIn(true)}>
              SIGN IN
            </Button>

            <Link href="/signup">
              <Button color="inherit">SIGN UP FOR FREE</Button>
            </Link>
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', paddingRight: 3 }}
            >
              Welcome{' '}
              {membershipLevel === 'platinum' || membershipLevel === 'gold'
                ? `${_.capitalize(membershipLevel)}  Member ${user.name}`
                : user.name}
              !
            </Typography>
            {(membershipLevel === 'free' || membershipLevel === 'gold') && (
              <Link href="/upgrade">
                <Button variant="contained" color="success">
                  UPGRADE
                </Button>
              </Link>
            )}
            <SignOut>SIGN OUT</SignOut>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
