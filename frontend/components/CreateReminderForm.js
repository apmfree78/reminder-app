import { useMutation } from '@apollo/client';
import { FormatAlignCenterOutlined } from '@mui/icons-material';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import gql from 'graphql-tag';
import { cardKeys } from '../lib/color-data';
import { soundKeys } from '../lib/sound-data';
import useForm from '../lib/useForm';

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

export default function CreateReminderForm({ closeForm }) {
  // create state for form input and handling
  // using custom hook useFomr
  const { inputs, handleChange, clearForm } = useForm({});
  console.log(inputs);

  const [createReminder, { loading, error, data }] = useMutation(
    CREATE_REMINDER_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await createReminder();
    console.log('new reminder created!');
    clearForm();
    closeForm();
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={loading} aria-busy={loading}>
        <TextField
          required
          type="number"
          id="time"
          name="time"
          label="Time (in mins)"
          margin="normal"
          value={inputs.time}
          onChange={handleChange}
        />
        <TextField
          required
          type="text"
          id="label"
          name="label"
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
            value={inputs.color}
            input={<OutlinedInput label="Color" />}
            onChange={handleChange}
          >
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
            value={inputs.sound}
            input={<OutlinedInput label="sound" />}
            onChange={handleChange}
          >
            {soundKeys.map((soundKey) => (
              <MenuItem key={soundKey} value={soundKey}>
                {soundKey}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="success">
          Create Reminder
        </Button>
      </fieldset>
    </form>
  );
}
