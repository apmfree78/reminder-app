import { Button, Grid } from '@mui/material';
import { cloneElement, useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModalTemplate from '../lib/ModalTemplate';

// BIG button pops up form to add a new Reminder when users clicks it
// title => headline text, disabled => boolean, is button disabled ?
// children is Create<Timer Type>Form component
export default function AddTimerButton({ children, id, title, disabled }) {
  const [createTimer, setCreateTimer] = useState(false);
  return (
    <>
      {/* when user clicks on big '+' show pop up to create Reminder */}
      {createTimer && (
        <ModalTemplate
          open={createTimer}
          setOpen={setCreateTimer}
          message={`Create a New ${title}`}
        >
          {cloneElement(children, { id })}
        </ModalTemplate>
      )}
      {/* final element is '+' button to add new Reminder Card  */}
      {/* Click big '+' and Modal popup will show from to add new Reminder   */}
      <Button disabled={disabled} onClick={() => setCreateTimer(true)}>
        {/* + icon  */}
        <AddBoxIcon sx={{ fontSize: 60, marginLeft: 3 }} />
        {title}
      </Button>
    </>
  );
}
