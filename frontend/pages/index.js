/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
// eslint-disable-next-line import/no-cycle
import { useQuery } from '@apollo/client';
import { Container, Grid, Typography } from '@mui/material';
import ReminderCard from '../components/reminder/ReminderCard';
import { CURRENT_USER_QUERY } from '../components/user/User';
import AddReminderButton from '../components/reminder/AddReminderButton';
// import client from '../apollo-client';

export default function Home() {
  // fetching data from database using GraphQL API call
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return console.error(error);
  //  if user is not logged in, direct them to do so
  if (!data.authenticatedItem)
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ margin: 10, padding: 10 }}
      >
        <Typography variant="h5">
          Please Sign In or Sign Up to view and create Reminders
        </Typography>
      </Grid>
    );
  console.log('hello');
  // deconstructing name of user, id of user, and their reminder cards

  const { id, name, reminders } = data.authenticatedItem;
  return (
    // rendering each Reminder Card on the screen
    <Container sx={{ p: 2 }} maxWidth="lg">
      {/* display all reminders on screen by mapping through 
      'reminders' array obtained from graphQL query */}
      <Grid container spacing={1}>
        {reminders.map((reminder) => (
          <Grid key={reminder.id} item xs={6} sm={4} md={3}>
            <ReminderCard key={reminder.id} reminder={reminder} author={name} />
          </Grid>
        ))}
        {/* final element is '+' button to add new Reminder Card
            passing id of user  */}
        <AddReminderButton id={id} />
      </Grid>
    </Container>
  );
}
