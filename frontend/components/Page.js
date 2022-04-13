import { CssBaseline } from '@mui/material';
import PropTypes from 'prop-types';
import Header from './Header';
// Page component that will wrap main app
// includes formatting, Header, etc
export default function Page({ children }) {
  return (
    <>
      <CssBaseline />
      <Header />
      {children}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
