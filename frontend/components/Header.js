import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Link from 'next/link';
import { useUser } from './user/User';
import SignOut from './user/SignOut';
import ModalTemplate from '../lib/ModalTemplate';
import SignIn from './user/SignIn';
import PasswordReset from './user/RequestReset';

// App main header
export default function Header() {
  // show sign in modal pop up ?
  const [signIn, showSignIn] = useState(false);
  // query for current user
  const user = useUser();

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
              Welcome {user.name}!
            </Typography>
            <Button variant="contained" color="success">
              UPGRADE TO PRO
            </Button>
            <SignOut>SIGN OUT</SignOut>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
