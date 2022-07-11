/* eslint-disable react/prop-types */
import { Typography } from '@mui/material';
import React from 'react';

// take seconds and returns mm:ss format as string
const displayTime = (time) => {
  const hours = Math.floor(time / 3600); // whole number of hours
  const rawMinutes = (time % 3600) / 60; // minutes as floating point number
  const minutes = Math.floor(rawMinutes); // whole number of minutes
  const seconds = Math.round((rawMinutes - minutes) * 60); // seconds
  if (hours > 0)
    return `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};
// show current time on timer and mode
// note current time is passed down as children from ReminderCard.js
const Timer = ({ children }) => (
  <Typography sx={{ fontSize: '3em' }} component="div">
    {displayTime(children)}
  </Typography>
);

export default Timer;
