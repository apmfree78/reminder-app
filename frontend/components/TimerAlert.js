/* eslint-disable react/prop-types */
import { Alert, AlertTitle } from '@mui/material';

export default function TimerAlert({ children }) {
  return (
    <Alert severity="error">
      <AlertTitle>Timer Complete</AlertTitle>
      {children}
    </Alert>
  );
}
