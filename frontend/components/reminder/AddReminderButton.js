import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModalTemplate from '../../lib/ModalTemplate';
import CreateReminderForm from './CreateReminderForm';

// BIG button pops up form to add a new Reminder when users clicks it
export default function AddReminderButton({ id, disabled }) {
  const [createReminder, setCreateReminder] = useState(false);
  return (
    <>
      {/* when user clicks on big '+' show pop up to create Reminder */}
      {createReminder && (
        <ModalTemplate
          open={createReminder}
          setOpen={setCreateReminder}
          message="Create a New Reminder"
        >
          <CreateReminderForm id={id} />
        </ModalTemplate>
      )}
      {/* final element is '+' button to add new Reminder Card  */}
      <Grid
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        item
        xs={6}
        sm={4}
        md={3}
      >
        {/* Click big '+' and Modal popup will show from to add new Reminder   */}
        <Button disabled={disabled} onClick={() => setCreateReminder(true)}>
          {/* + icon  */}
          <AddBoxIcon sx={{ fontSize: 80 }} />
        </Button>
      </Grid>
    </>
  );
}
