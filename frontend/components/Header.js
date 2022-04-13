import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// App main header
export default function Header() {
  return (
    <AppBar position="static">
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
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 'bold', flexGrow: 1 }}
        >
          Reminder
        </Typography>
        <Button color="inherit">Login</Button>
        <Button color="inherit">Logout</Button>
        <Button variant="contained" color="success">
          UPGRADE TO PRO
        </Button>
      </Toolbar>
    </AppBar>
  );
}
