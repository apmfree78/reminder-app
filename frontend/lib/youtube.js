import React from 'react';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const Youtube = ({ embedId }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Typography
      sx={{ m: 3, fontSize: 30, fontWeight: 'bold' }}
      color="text.primary"
      gutterBottom
    >
      Watch Quick Video Walkthrough of Reminder App
    </Typography>
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </Card>
);

Youtube.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default Youtube;
