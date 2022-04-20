/* eslint-disable react/prop-types */
import { TextField } from '@mui/material';

export default function EmailPassTemplate({ email, password, handleChange }) {
  return (
    <>
      <TextField
        required
        autoFocus
        type="text"
        id="email"
        name="email"
        label="Email"
        variant="filled"
        color="primary"
        margin="normal"
        placeholder="Your Email Address"
        autoComplete="email"
        value={email}
        onChange={handleChange}
      />
      <TextField
        required
        type="password"
        id="password"
        name="password"
        label="Password"
        variant="filled"
        color="primary"
        margin="normal"
        placeholder="Your New Password"
        autoComplete="password"
        value={password}
        onChange={handleChange}
      />
    </>
  );
}
