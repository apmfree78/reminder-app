/* eslint-disable react/prop-types */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Swal from 'sweetalert2';

// graphQl mutation to delete Pomodoro
const DELETE_POMODORO = gql`
  mutation DELETE_POMODORO($id: ID!) {
    deletePomodoro(id: $id) {
      id
    }
  }
`;

// remove Pomodoro directly from cache
function update(cache, payload) {
  console.log('running the update function after the delete');
  cache.evict(cache.identify(payload.data.deletePomodoro));
}

export default function DeletePomodoro({ id, closeForm, children }) {
  const [deletePomodoro, { loading }] = useMutation(DELETE_POMODORO, {
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
          deletePomodoro().catch((err) => alert(err.message));
          closeForm();
          Swal.fire({
            icon: 'error',
            title: 'Its Gone!',
            text: 'Pomodoro Deleted!',
            timer: 5000,
          });
        }
      }}
    >
      {children}
    </Button>
  );
}
