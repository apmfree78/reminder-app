/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
// eslint-disable-next-line import/no-cycle
import { useQuery } from '@apollo/client';
import { Container, Grid } from '@mui/material';
import { useState } from 'react';
import gql from 'graphql-tag';
import ReminderCard from '../components/reminder/ReminderCard';
import PomodoroCard from '../components/pomodoro/PomodoroCard';
import { CURRENT_USER_QUERY } from '../components/user/User';
import AddTimerButton from '../components/AddTimerButton';
import { membershipLocal } from '../lib/membership-data';
import CreateReminderForm from '../components/reminder/CreateReminderForm';
import CreatePomodoroForm from '../components/pomodoro/CreatePomodoroForm';
import Youtube from '../lib/youtube';

export const ALL_TIMER_QUERY = gql`
  query {
    allReminders {
      id
      time
      label
      alert
      color
      sound
    }
    allPomodoros {
      id
      session
      break
      color
      sound
    }
  }
`;

// boolean function that determins if users has match or exceeded
// number of reminder user can create at current membership level
function isReminderLimitHit(user) {
  const reminderCount = user.reminders?.length; // number of reminders user has
  const membershipLevel = user.membership?.name; // user membership level

  // checking membership level to see if Reminder limit is matched or exceeded
  // using membershipLocal object which locally contains info on the memberships
  return reminderCount >= membershipLocal[membershipLevel].reminderLimit;
}

export default function Home() {
  // set state variable to track number of reminders user has
  // if user hits the limit set by their membership plan
  // then they cannot create any more reminders
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);

  // variables to hold data from graphQL call
  let id = '625355c4e03430098b2f3e1d'; // user id
  let name = 'Amit'; // user name
  let reminders; // JSON reminders
  let pomodoros; // JSON pomodors

  // fetching data from database using GraphQL API call
  // const user = useUser();
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(CURRENT_USER_QUERY);

  // FOR USER DEMO
  const { data, loading, error } = useQuery(ALL_TIMER_QUERY);

  // checking loading and error states
  if (userLoading) return <p>Loading...</p>;
  if (userError) return console.error(userError);

  // FOR USER DEMO
  if (loading) return <p>Loading...</p>;
  if (error) return console.error(error);

  // extracting user data and timer data
  const user = userData?.authenticatedItem; // user data
  // console.log(user);

  // FOR USER DEMO
  const allTimers = data; // all timer (pomodoro + reminder) data

  // call function isReminderLimit hit to check is user can still
  // add more reminders.  This function will return a boolean which
  // will then set the state for addButtonDisabled
  if (!user) {
    // FOR USER DEMO
    // if user is not logged in show all timers
    ({ allReminders: reminders, allPomodoros: pomodoros } = allTimers);
  } else {
    // destructuring name of user, id of user, and their reminder cards
    ({ id, name, reminders, pomodoros } = user);
    const limitHit = isReminderLimitHit(user);
    if (addButtonDisabled !== limitHit) setAddButtonDisabled(limitHit);
  }
  // COMMENTED OUT FOR USER DEMO
  /*   //  if user is not logged in, direct them to do so
  if (!user)
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
    ); */

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
        {pomodoros.map((pomodoro) => (
          <Grid key={pomodoro.id} item xs={6} sm={4} md={3}>
            <PomodoroCard key={pomodoro.id} pomodoro={pomodoro} author={name} />
          </Grid>
        ))}
        {/* final element is '+' button to add new Reminder Card
            passing id of user  */}
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'baseline',
            justifyContent: 'center',
          }}
          item
          xs={6}
          sm={4}
          md={3}
        >
          <AddTimerButton id={id} title="Reminder" disabled={addButtonDisabled}>
            <CreateReminderForm />
          </AddTimerButton>
          <AddTimerButton id={id} title="Pomodoro" disabled={addButtonDisabled}>
            <CreatePomodoroForm />
          </AddTimerButton>
        </Grid>
      </Grid>
      <Youtube embedId="tlAKXyPd7i8" />
    </Container>
  );
}
