/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, IconButton } from '@mui/material';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import { cloneElement } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 325,
  bgcolor: 'background.paper',
  border: '2px solid #b3b3cc',
  boxShadow: 100,
  borderRadius: 2,
  p: 2,
  m: 1,
};

export default function ModalTemplate({ open, setOpen, message, children }) {
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') setOpen(false);
  };
  // deconstructing props

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create or update reminder"
      aria-describedby="modal popup to create or update reminder"
    >
      <Box sx={style}>
        <Grid container justifyContent="flex-end" alignItems="flex-start">
          <IconButton onClick={handleClose}>
            <CancelPresentationOutlinedIcon fontSize="large" color="action" />
          </IconButton>
        </Grid>
        <Typography
          id="reminder"
          variant="h6"
          component="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontStyle: 'italic',
            p: 1,
          }}
        >
          {message}
        </Typography>
        {cloneElement(children, { closeForm: handleClose })}
      </Box>
    </Modal>
  );
}
