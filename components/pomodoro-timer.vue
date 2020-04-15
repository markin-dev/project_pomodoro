<template>
    <!-- передавать конфиги пропсами -->
    <div v-if="currentTimerType">
        <svg
            class="timer"
            :height="$getConfig('TIMER_SIZE')"
            :width="$getConfig('TIMER_SIZE')"
        >
            <circle
                :stroke-width="$getConfig('STROKE_WIDTH')"
                :r="circleRadius"
                :cx="$getConfig('TIMER_SIZE') / 2"
                :cy="$getConfig('TIMER_SIZE') / 2"
                :stroke="$getConfig('GRAY')"
                fill="transparent"
            />
            <circle
                :stroke-width="$getConfig('STROKE_WIDTH')"
                :r="circleRadius"
                :cx="$getConfig('TIMER_SIZE') / 2"
                :cy="$getConfig('TIMER_SIZE') / 2"
                :stroke="timerTypes[currentTimerType].color"
                :style="circleStyles"
                class="timer__progress-circle"
                fill="transparent"
            />
            <text
                x="50%"
                y="50%"
                class="timer__countdown"
                text-anchor="middle"
                dominant-baseline="middle"
                :fill="`${timerTypes[currentTimerType].color}`"
                :style="{fontSize: `${$getConfig('TIMER_SIZE') * 0.27}px`}"
            >
                {{ timerSeconds | formatTime }}
            </text>
            <circle
                :r="circleRadius + $getConfig('STROKE_WIDTH') / 2"
                :cx="$getConfig('TIMER_SIZE') / 2"
                :cy="$getConfig('TIMER_SIZE') / 2"
                class="timer__clickable-circle"
                fill="transparent"
                @click="timerStatus == $getConfig('TIMER_STATUSES').stopped ? startTimer() : stopTimer()"
            />
            <startButton
                v-if="timerStatus == $getConfig('TIMER_STATUSES').stopped"
                :radius="circleRadius + $getConfig('STROKE_WIDTH') / 2"
                :color="timerTypes[currentTimerType].color"
                :hover-color="timerTypes[currentTimerType].hoverColor"
                @click="startTimer"
            />
        </svg>
    </div>
</template>

<script>
import startButton from './start-button.vue';

export default {
    components: {
        startButton,
    },

    filters: {
        formatTime(timerSeconds) {
            let minutes = parseInt(timerSeconds / 60, 10);
            let seconds = parseInt(timerSeconds % 60, 10);

            minutes = minutes < 10
                ? `0${minutes}`
                : minutes;

            seconds = seconds < 10
                ? `0${seconds}`
                : seconds;

            return `${minutes}:${seconds}`;
        },
    },

    data() {
        return {
            timerID: null,
            timerSeconds: 0,
            progressCircleFillPercent: 0,
            isProgressCircleTransition: false,
            timerStatus: this.$getConfig('TIMER_STATUSES').stopped,
            currentTimerType: null,
            initTimerSeconds: 0,
            timerTypes: {
                work: {
                    time: this.$getConfig('WORK_TIMER_SECONDS'),
                    color: this.$getConfig('BLUE'),
                    hoverColor: this.$getConfig('LIGHT_BLUE'),
                },
                relax: {
                    time: this.$getConfig('RELAX_TIMER_SECONDS'),
                    color: this.$getConfig('GREEN'),
                    hoverColor: this.$getConfig('LIGHT_GREEN'),
                },
            },
        };
    },

    computed: {
        circleRadius() {
            return (this.$getConfig('TIMER_SIZE') - this.$getConfig('STROKE_WIDTH')) / 2;
        },

        circumference() {
            return this.circleRadius * 2 * Math.PI;
        },

        circleStyles() {
            return {
                transition: this.isProgressCircleTransition ? 'stroke-dashoffset 0.35s' : '',
                strokeDashoffset: this.circumference - this.progressCircleFillPercent * this.circumference,
                strokeDasharray: `${this.circumference} ${this.circumference}`,
            };
        },
    },

    mounted() {
        chrome.storage.local.get('projectPomodoro', (item) => {
            if (!item || !item.projectPomodoro || !item.projectPomodoro.currentTimerType) {
                chrome.storage.local.set({
                    projectPomodoro: {
                        currentTimerType: 'work',
                    },
                });

                this.currentTimerType = 'work';
            } else {
                this.currentTimerType = item.projectPomodoro.currentTimerType;
            }

            this.initTimerSeconds = this.timerTypes[this.currentTimerType].time;

            chrome.alarms.get('projectPomodoroTimer', (alarm) => {
                if (alarm && alarm.name === 'projectPomodoroTimer') {
                    const remainingTimerSeconds = Math.floor((alarm.scheduledTime - Date.now()) / 1000);

                    this.progressCircleFillPercent = (this.initTimerSeconds - remainingTimerSeconds)
                        / this.initTimerSeconds;

                    this.startTimer();
                }
            });
        });
    },

    methods: {
        startTimer() {
            chrome.alarms.get('projectPomodoroTimer', (alarm) => {
                if (alarm && alarm.name === 'projectPomodoroTimer') {
                    this.timerSeconds = Math.floor((alarm.scheduledTime - Date.now()) / 1000);
                } else {
                    this.timerSeconds = this.timerTypes[this.currentTimerType].time;

                    chrome.alarms.create('projectPomodoroTimer', {
                        delayInMinutes: this.timerTypes[this.currentTimerType].time / 60,
                    });
                }

                chrome.alarms.onAlarm.addListener((triggeredAlarm) => {
                    if (triggeredAlarm.name === 'projectPomodoroTimer') {
                        this.stopTimer();
                    }
                });

                this.timerStatus = this.$getConfig('TIMER_STATUSES').running;
                this.startCountdown();
            });
        },

        stopTimer() {
            this.timerStatus = this.$getConfig('TIMER_STATUSES').stopped;
            this.timerSeconds = 0;
            this.progressCircleFillPercent = 0;
            this.toggleTimerType();
            clearInterval(this.timerID);
            chrome.alarms.clear('projectPomodoroTimer');
        },

        startCountdown() {
            let now = new Date();
            const deadline = this.addSeconds(now, this.timerSeconds);
            const initTimerSeconds = this.timerTypes[this.currentTimerType].time;

            setTimeout(() => {
                this.isProgressCircleTransition = true;
            }, 100);

            this.timerID = setInterval(() => {
                now = new Date();
                this.timerSeconds = this.countTimeDiffInSec(now, deadline);

                this.progressCircleFillPercent = (initTimerSeconds - this.timerSeconds) / initTimerSeconds;
            }, 1000);
        },

        addSeconds(date, seconds) {
            return new Date(date.getTime() + seconds * 1000);
        },

        countTimeDiffInSec(startDate, endDate) {
            return (Date.parse(endDate) - Date.parse(startDate)) / 1000;
        },

        toggleTimerType() {
            chrome.storage.local.get('projectPomodoro', (item) => {
                this.currentTimerType = item.projectPomodoro.currentTimerType === 'work' ? 'relax' : 'work';

                chrome.storage.local.set({
                    projectPomodoro: {
                        currentTimerType: this.currentTimerType,
                    },
                });
            });
        },
    },
};
</script>

<style lang="less">
.timer {
    &__progress-circle {
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
    }

    &__countdown {
        font-family: 'Roboto', sans-serif;
        user-select: none;
    }

    &__clickable-circle {
        cursor: pointer;
    }
}
</style>
