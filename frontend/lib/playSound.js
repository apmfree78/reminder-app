import { alertSounds } from './sound-data';

// play sound when timer is complete
const playSound = (sound) => {
  console.log(sound);
  const alarm = new Audio(`../sounds/${alertSounds[sound].file}`);

  // setting volume
  alarm.volume = 0.5;
  alarm.play();
};

export default playSound;
