/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateReminderForm from './CreateReminderForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
  m: 4,
};

export default function CreateReminderModal({ open, setOpen }) {
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') setOpen(false);
  };
  // deconstructing props

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container justifyContent="flex-end" alignItems="center">
          {/* <Typography variant='div'>Dialog</Typography> */}
          <IconButton onClick={handleClose}>
            <CloseIcon fontSize="large" color="action" />
          </IconButton>
        </Grid>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create a New Reminder
        </Typography>
        <CreateReminderForm closeForm={handleClose} />
      </Box>
    </Modal>
  );
}
