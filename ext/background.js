
import audioAlertPath from '../assets/alert.mp3';
import {
    BLUE,
    GREEN,
} from '../constatns';

let intervalID;
const audioAlert = new Audio(audioAlertPath);

function setBadgeColor(timerType) {
    chrome.browserAction.setBadgeBackgroundColor({
        color: timerType === 'work' ? BLUE : GREEN,
    });
}

function formatBadgeText(seconds) {
    return seconds > 60 ? `${Math.ceil(seconds / 60)}m` : `${seconds}s`;
}

function startCountdownInBadge() {
    clearInterval(intervalID);

    // убрать из компонента vue alarms.get, вместо это слать отсюда месадж с актуальным временем
    intervalID = setInterval(() => {
        chrome.alarms.get('projectPomodoroTimer', (alarm) => {
            if (alarm) {
                const remainingTime = Math.ceil((alarm.scheduledTime - Date.now()) / 1000);

                chrome.browserAction.setBadgeText({ text: `${formatBadgeText(remainingTime)}` });
            }
        });
    }, 10);
}

chrome.storage.local.get('projectPomodoro', (item) => {
    if (item && item.projectPomodoro && item.projectPomodoro.currentTimerType) {
        setBadgeColor(item.projectPomodoro.currentTimerType);
        startCountdownInBadge();
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message === 'startTimer') {
        startCountdownInBadge();
    } else if (message === 'stopTimer') {
        clearInterval(intervalID);
    }
});

chrome.storage.onChanged.addListener(() => {
    chrome.storage.local.get('projectPomodoro', (item) => {
        setBadgeColor(item.projectPomodoro.currentTimerType);
        chrome.browserAction.setBadgeText({ text: '' });
    });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'projectPomodoroTimer') {
        audioAlert.play();

        chrome.storage.local.get('projectPomodoro', (item) => {
            chrome.storage.local.set({
                projectPomodoro: {
                    currentTimerType: item.projectPomodoro.currentTimerType === 'work' ? 'relax' : 'work',
                },
            });
        });
    }
});
