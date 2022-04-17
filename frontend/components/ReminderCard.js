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
import Timer from './Timer';
import TimerAlert from './TimerAlert';
import playSound from '../lib/playSound';
import { cardColors } from '../lib/color-data';
import ModalTemplate from '../lib/ModalTemplate';
import UpdateReminderForm from './UpdateReminderForm';

export default function ReminderCard({ reminder }) {
  // setting initial states based on reminder prop
  // this prop is ultimate info from the database
  const _session = reminder.time; // timer session length in minutes
  const _playing = false; // is timer on? boolean play => true, pause => false
  const _current = _session * 60; // current time in seconds

  // deconstruction reminder prop
  const { label, alert, author, sound, color } = reminder;

  // setting local state
  const [isPlaying, setIsPlaying] = useState(_playing);
  const [currentTime, setTime] = useState(_current);
  const [timerAlert, setTimerAlert] = useState(false); // show timer alert message?
  const [openSettings, setOpenSettings] = useState(false);

  // callback function for setInternal
  // function will be repeated each second
  // this function decrements currentTime by 1 and changes mode when
  // currentTime hits zero
  const countDown = () => {
    let _currentTime = currentTime;

    // reducing currentTime
    _currentTime -= 1;

    // checking if timer is complete, if so, stopping timer
    // and ringing alarm
    if (_currentTime < 0) {
      // stop timer
      setIsPlaying(false);

      // reseting timer
      _currentTime = _session * 60;

      // RING ALARM now that session has ended
      playSound(sound);

      // show timer alert message
      setTimerAlert(true);
    }

    // finally setting state
    setTime(_currentTime);
  };

  // only starting play, if timer was stopped
  // set isPlaying to true
  const playTimer = () => {
    // start playing, if not playing
    if (!isPlaying) setIsPlaying(true);

    // remove timer alert message , if any
    setTimerAlert(false);
  };

  // stop timer if it's on
  const stopTimer = () => isPlaying && setIsPlaying(false);

  // reset state to initial values
  const refresh = () => {
    // if timer is running, stop it
    // set isPlaying to false
    if (isPlaying) setIsPlaying(false);

    // restate state to default values
    setIsPlaying(_playing); // is clock on? boolean play => true, pause = false
    setTime(_current); // current time in seconds
    setTimerAlert(false);
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

  // if reminder.time is updated, reset currentTime to match it
  useEffect(() => setTime(reminder.time * 60), [reminder.time]);

  return (
    <Card
      sx={{ bgcolor: cardColors[color], maxWidth: 345, boxShadow: 4, m: 1 }}
    >
      {/* display custom alert to user when timer completes */}
      {timerAlert && <TimerAlert>{alert}</TimerAlert>}
      {/* display settings modal to change Reminder Settings  */}
      {openSettings && (
        <ModalTemplate
          open={openSettings}
          setOpen={setOpenSettings}
          message={`Edit ${reminder.label} Reminder`}
        >
          <UpdateReminderForm reminder={reminder} />
        </ModalTemplate>
      )}
      <CardHeader
        /*        avatar={ 
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            T
          </Avatar>
        } */
        // gear to adjust settings
        action={
          <IconButton
            aria-label="settings"
            onClick={() => setOpenSettings(true)}
          >
            <SettingsIcon />
          </IconButton>
        }
        title={label} // Reminder label
        subheader={`Created by: ${author ? author.name : 'Anon'}`} // author name
      />

      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {/*         Display current time on timer
        sending current time to timer component which will return formatted time */}
        <Timer>{currentTime}</Timer>
        {/* reminder message */}
        <Typography variant="inherit" color="text.primary">
          {alert}
        </Typography>
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
