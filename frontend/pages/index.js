/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
// eslint-disable-next-line import/no-cycle
import { useQuery } from '@apollo/client';
import { Button, Container, Grid } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import gql from 'graphql-tag';
import { useState } from 'react';
import ReminderCard from '../components/ReminderCard';
import ModalTemplate from '../lib/ModalTemplate';
import CreateReminderForm from '../components/CreateReminderForm';
// import client from '../apollo-client';

export const ALL_REMINDERS_QUERY = gql`
  query {
    allReminders {
      id
      time
      label
      sound
      color
      alert
      author {
        name
      }
    }
  }
`;

export default function Home() {
  const [createReminder, setCreateReminder] = useState(false);

  // fetching data from database using GraphQL API call
  const { data, loading, error } = useQuery(ALL_REMINDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return console.error(error);
  const reminders = data.allReminders;
  return (
    // rendering each Reminder Card on the screen
    <Container sx={{ p: 2 }} maxWidth="lg">
      {/* when user clicks on big '+' show pop up to create Reminder */}
      {createReminder && (
        <ModalTemplate
          open={createReminder}
          setOpen={setCreateReminder}
          message="Create a New Reminder"
        >
          <CreateReminderForm />
        </ModalTemplate>
      )}
      {/* display all reminders on screen by mapping through 
      'reminders' array obtained from graphQL query */}
      <Grid container spacing={1}>
        {reminders.map((reminder) => (
          <Grid key={reminder.id} item xs={6} sm={4} md={3}>
            <ReminderCard key={reminder.id} reminder={reminder} />
          </Grid>
        ))}
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
          <Button onClick={() => setCreateReminder(true)}>
            {/* + icon  */}
            <AddBoxIcon sx={{ fontSize: 80 }} />
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
