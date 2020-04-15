
import audioAlertPath from '../assets/alert.mp3';

const audioAlert = new Audio(audioAlertPath);

chrome.alarms.onAlarm.addListener((alarm) => {
    if ( alarm.name === 'projectPomodoroTimer' ) {
        audioAlert.play();

        chrome.storage.local.get('projectPomodoro', item => {
            chrome.storage.local.set({
                projectPomodoro: {
                    currentTimerType: item.projectPomodoro.currentTimerType === 'work' ? 'relax' : 'work',
                },
            });
        })
    }
})
