/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import { Button, Container, Grid } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import gql from 'graphql-tag';
import ReminderCard from '../components/ReminderCard';
// import client from '../apollo-client';

const REMINDER_QUERY = gql`
  query {
    allReminders {
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
  const { data, loading, error } = useQuery(REMINDER_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return console.error(error);
  const reminders = data.allReminders;
  return (
    // rendering each Reminder Card on the screen
    <Container sx={{ p: 2 }} maxWidth="lg">
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
          <Button>
            {/* + icon  */}
            <AddBoxIcon sx={{ fontSize: 80 }} />
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
