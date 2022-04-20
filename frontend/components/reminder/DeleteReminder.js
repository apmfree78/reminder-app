/* eslint-disable react/prop-types */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// graphQl mutation to delete Reminder
const DELETE_REMINDER = gql`
  mutation DELETE_REMINDER($id: ID!) {
    deleteReminder(id: $id) {
      id
    }
  }
`;

// remove Reminder directly from cache
function update(cache, payload) {
  console.log(`payload : ${payload}`);
  console.log('running the update function after the delete');
  cache.evict(cache.identify(payload.data.deleteReminder));
}

export default function DeleteReminder({ id, closeForm, children }) {
  const [deleteReminder, { loading }] = useMutation(DELETE_REMINDER, {
    variables: { id },
    update,
  });
  return (
    <Button
      type="button"
      size="medium"
      variant="contained"
      color="warning"
      startIcon={<DeleteOutlineIcon />}
      sx={{ marginTop: 2 }}
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure want to delete this item?')) {
          // go ahead and delete it
          deleteReminder().catch((err) => alert(err.message));
          closeForm();
        }
      }}
    >
      {children}
    </Button>
  );
}
