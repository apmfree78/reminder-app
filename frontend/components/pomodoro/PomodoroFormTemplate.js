/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
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
import { cardKeys } from '../../lib/color-data';
import { soundKeys } from '../../lib/sound-data';

// min and max time can be set for timer
const MIN_TIME = 1;
const MAX_TIME = 10000;

// show form to add or Edit Pomodoro
// MUST pass closeForm prop, which is a function that is
// execute to close whatever popup this form shows up in
// right now it's setup to accept 'closeFrom' from ModalTemplate
// located in /lib/ModalTemplate.js
export default function CreatePomodoroForm({
  session,
  break: breakTime,
  sound,
  color,
  handleChange,
  handleSubmit,
  loading,
  buttonTextCTA = 'Submit', // button call to action text
  children, // pass optional component here that will display below form
}) {
  // input form to create new Pomodoro,
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
              id="session"
              name="session"
              inputProps={{ min: MIN_TIME, max: MAX_TIME }}
              variant="filled"
              color="primary"
              margin="normal"
              label="Session Length (in mins)"
              value={session}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl required sx={{ marginTop: 1, width: 200 }}>
            <TextField
              required
              type="number"
              id="break"
              name="break"
              inputProps={{ min: MIN_TIME, max: MAX_TIME }}
              variant="filled"
              color="primary"
              margin="normal"
              label="Break Length (in mins)"
              value={breakTime}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl required sx={{ marginTop: 2, width: 200 }}>
            <InputLabel id="color">Color</InputLabel>
            <Select
              id="color"
              name="color"
              label="Color"
              color="secondary"
              value={color}
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
              value={sound}
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
          {/* button click triggers graphQL mutation to create new Pomodoro and update cache */}
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
          >
            {buttonTextCTA}
          </Button>
          {children}
        </Grid>
      </fieldset>
    </form>
  );
}
