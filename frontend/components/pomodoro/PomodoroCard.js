/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import PauseIcon from '@mui/icons-material/Pause';
import SettingsIcon from '@mui/icons-material/Settings';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Timer from '../Timer';
import TimerAlert from '../TimerAlert';
import playSound from '../../lib/playSound';
import { cardColors } from '../../lib/color-data';
import ModalTemplate from '../../lib/ModalTemplate';
// import UpdatepomodoroForm from '../pomodoro/UpdatePomodoroForm';

export default function PomodoroCard({ pomodoro, author }) {
  // setting initial states based on pomodoro prop
  // this prop is ultimate info from the database
  const _session = pomodoro.session; // timer session length in minutes
  const _playing = false; // is timer on? boolean play => true, pause => false
  const _current = _session * 60; // current time in seconds
  const _mode = 'Session'; // mode can be 'Session' or 'Break'

  // deconstruction pomodoro sound and color props
  const { sound, color } = pomodoro;

  // setting local state
  const [isPlaying, setIsPlaying] = useState(_playing);
  const [currentTime, setTime] = useState(_current);
  const [openSettings, setOpenSettings] = useState(false);
  const [mode, setMode] = useState(_mode);

  // title of this Productivity Timer
  const title = `${pomodoro.session}-${pomodoro.break} Timer`;

  // callback function for setInternal
  // function will be repeated each second
  // this function decrements currentTime by 1 and changes mode when
  // currentTime hits zero
  const countDown = () => {
    let _currentTime = currentTime;
    let currentMode = mode;

    // reducing currentTime
    _currentTime -= 1;

    // checking if current mode, break or session is complete
    // and ringing alarm and showing AlertMessage
    if (_currentTime < 0) {
      // switching mode and resetting currentTime to reflect mode change
      if (currentMode === 'Session') {
        currentMode = 'Break';
        _currentTime = pomodoro.break * 60;
      } else {
        currentMode = 'Session';
        _currentTime = pomodoro.session * 60;
      }
      // RING ALARM now that session has ended
      playSound(sound);

      // set mode
      setMode(currentMode);
    }

    // finally setting state
    setTime(_currentTime);
  };

  // only starting play, if timer was stopped
  // set isPlaying to true
  const playTimer = () => !isPlaying && setIsPlaying(true);

  // stop timer if it's on
  const stopTimer = () => isPlaying && setIsPlaying(false);

  // reset state to initial values
  const refresh = () => {
    // if timer is running, stop it
    // set isPlaying to false
    if (isPlaying) setIsPlaying(false);

    // restate state to default values
    setIsPlaying(_playing); // is clock on? boolean play => true, pause = false
    setTime(pomodoro.session * 60); // current time in seconds
  };

  // useEffect to setInterval and clearInterval for timer
  useEffect(() => {
    // itializing timer
    const interval = setInterval(countDown, 1000);

    // if timer is stopped , or never started
    // then clear interval
    if (!isPlaying) clearInterval(interval);

    // on unmount clear interval
    return () => clearInterval(interval);
  });

  // if pomodoro.time is updated, reset currentTime to match it
  useEffect(() => {
    if (mode === 'Session') setTime(pomodoro.session * 60);
    else setTime(pomodoro.break * 60);
  }, [pomodoro.session, pomodoro.break]);

  return (
    <Card
      sx={{
        bgcolor: cardColors[color],
        maxWidth: 345,
        boxShadow: 15,
        m: 1,
        borderRadius: 5,
      }}
    >
      {/* display settings modal to change pomodoro Settings  */}
      {/* {openSettings && (
        <ModalTemplate
          open={openSettings}
          setOpen={setOpenSettings}
          message={`Edit ${pomodoro.label} pomodoro`}
        >
          <UpdatepomodoroForm pomodoro={pomodoro} />
        </ModalTemplate>
      )} */}
      <CardHeader
        // gear to adjust settings
        action={
          <IconButton
            aria-label="settings"
            onClick={() => setOpenSettings(true)}
          >
            <SettingsIcon />
          </IconButton>
        }
        title={title} // pomodoro label
        subheader={`Created by: ${author || 'Anon'}`} // author name
      />

      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/*         Display current time on timer
        sending current time to timer component which will return formatted time */}
        <Typography
          variant="h4"
          color="text.primary"
          sx={{ fontStyle: 'italic' }}
        >
          {mode}
        </Typography>
        <Timer>{currentTime}</Timer>
        {/* pomodoro message */}
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        disableSpacing
      >
        {/* control panel : play, pause, reset timer */}
        <IconButton color="primary" aria-label="play" onClick={playTimer}>
          <PlayCircleOutlineIcon fontSize="large" />
        </IconButton>
        <IconButton aria-label="pause" onClick={stopTimer}>
          <PauseIcon fontSize="large" />
        </IconButton>
        <IconButton sx={{ color: 'red' }} aria-label="reset" onClick={refresh}>
          <ReplayIcon fontSize="large" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
