
import audioAlertPath from '../assets/alert.mp3';

const audioAlert = new Audio(audioAlertPath);


chrome.alarms.onAlarm.addListener(() => {
    audioAlert.play();
})
