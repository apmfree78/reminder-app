/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Grid,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import gql from 'graphql-tag';
import { cardKeys } from '../lib/color-data';
import { soundKeys } from '../lib/sound-data';
import useForm from '../lib/useForm';
import { ALL_REMINDERS_QUERY } from '../pages';

// graphQL mutation to create a new Reminder
const CREATE_REMINDER_MUTATION = gql`
  mutation CREATE_REMINDER_MUTATION(
    $time: Int!
    $label: String!
    $alert: String!
    $color: String!
    $sound: String!
  ) {
    createReminder(
      data: {
        time: $time
        label: $label
        alert: $alert
        color: $color
        sound: $sound
      }
    ) {
      id
      label
    }
  }
`;

// min and max time can be set for timer
const MIN_TIME = 10;
const MAX_TIME = 120;

// show form to add new Reminder
// MUST pass closeForm prop, which is a function that is
// execute to close whatever popup this form shows up in
// right now it's setup to accept 'closeFrom' from ModalTemplate
// located in /lib/ModalTemplate.js
export default function CreateReminderForm({ closeForm }) {
  // create state for form input and handling
  // using custom hook useFomr
  const { inputs, handleChange, clearForm } = useForm({});
  console.log(inputs);

  // useMutation hook to generate createReminder function
  // that will create new Reminder
  const [createReminder, { loading, error }] = useMutation(
    CREATE_REMINDER_MUTATION,
    {
      variables: inputs, // submit form inputs to create new Reminder
      refetchQueries: [{ query: ALL_REMINDERS_QUERY }], // update apollo cache
    }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return console.error(error); // catch errors
  // show Alert success message if Reminder is successfully created

  async function handleSubmit(e) {
    e.preventDefault(); // prevent default form behavior
    await createReminder(); // create new reminder using 'inputs' from form
    console.log('new reminder created!');
    clearForm();
    closeForm();
  }
  // input form to create new Reminder,
  // will take : time (in minutes), title (label), alert message,
  // color , and sound.  all fields are required.  color and
  // sound are pre-defined - user selects from drop down
  return (
    <form onSubmit={handleSubmit}>
      {/* use fieldset to disable form when graphQL mutation is executing */}
      <fieldset disabled={loading} aria-busy={loading}>
        <Grid container justifyContent="center" alignItems="center">
          <FormControl required sx={{ marginTop: 1, width: 200 }}>
            <TextField
              required
              autoFocus
              type="number"
              id="time"
              name="time"
              inputProps={{ min: MIN_TIME, max: MAX_TIME }}
              variant="filled"
              color="primary"
              label="Time (in mins)"
              margin="normal"
              value={inputs.time}
              onChange={handleChange}
            />
          </FormControl>
          <TextField
            required
            type="text"
            id="label"
            name="label"
            variant="filled"
            color="info"
            label="Short Title"
            margin="normal"
            value={inputs.label}
            onChange={handleChange}
          />
          <TextField
            required
            type="text"
            id="alert"
            name="alert"
            label="Alert Message"
            variant="filled"
            color="success"
            multiline
            rows={3}
            margin="normal"
            value={inputs.alert}
            onChange={handleChange}
          />
          <FormControl required sx={{ marginTop: 2, width: 200 }}>
            <InputLabel id="color">Color</InputLabel>
            <Select
              id="color"
              name="color"
              label="Color"
              color="secondary"
              value={inputs.color}
              input={<OutlinedInput label="Color" />}
              onChange={handleChange}
            >
              {/* pulling colors from lib/color-data.js  */}
              {cardKeys.map((cardkey) => (
                <MenuItem key={cardkey} value={cardkey}>
                  {cardkey}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            required
            sx={{ marginTop: 2, marginBottom: 3, width: 200 }}
          >
            <InputLabel id="sound">Sound</InputLabel>
            <Select
              id="sound"
              name="sound"
              label="Sound"
              color="warning"
              value={inputs.sound}
              input={<OutlinedInput label="sound" />}
              onChange={handleChange}
            >
              {/* pulling sounds from lib/sound-data.js  */}
              {soundKeys.map((soundKey) => (
                <MenuItem key={soundKey} value={soundKey}>
                  {soundKey}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* button click triggers graphQL mutation to create new Reminder and update cache */}
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
          >
            Create Reminder
          </Button>
        </Grid>
      </fieldset>
    </form>
  );
}
