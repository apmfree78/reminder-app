/* eslint-disable react/prop-types */
import { Typography } from '@mui/material';
import React from 'react';

// take seconds and returns mm:ss format as string
const displayTime = (seconds) =>
  `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

// show current time on timer and mode
// note current time is passed down as children from ReminderCard.js
const Timer = ({ children }) => (
  <Typography variant="h1" component="div">
    {displayTime(children)}
  </Typography>
);

export default Timer;
