<template>
    <div>
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
                {{ `${formattedTime}` }}
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

    data() {
        return {
            timerID: null,
            timerSeconds: 0,
            progressCircleFillPercent: 0,
            timerStatus: this.$getConfig('TIMER_STATUSES').stopped,
            currentTimerType: 'work',
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
                strokeDashoffset: this.circumference - this.progressCircleFillPercent * this.circumference,
                strokeDasharray: `${this.circumference} ${this.circumference}`,
            };
        },

        formattedTime() {
            let minutes = parseInt(this.timerSeconds / 60, 10);
            let seconds = parseInt(this.timerSeconds % 60, 10);

            minutes = minutes < 10
                ? `0${minutes}`
                : minutes;

            seconds = seconds < 10
                ? `0${seconds}`
                : seconds;

            return `${minutes}:${seconds}`;
        },
    },

    methods: {
        startTimer() {
            this.timerStatus = this.$getConfig('TIMER_STATUSES').running;
            this.countdown();
        },

        stopTimer() {
            const audioAlert = new Audio('/assets/alert.mp3');

            this.timerStatus = this.$getConfig('TIMER_STATUSES').stopped;
            this.timerSeconds = 0;
            this.progressCircleFillPercent = 0;
            this.toggleTimerType();
            clearInterval(this.timerID);
            audioAlert.play();
        },

        countdown() {
            let now = new Date();

            this.timerSeconds = this.timerTypes[this.currentTimerType].time;

            const deadline = this.addSeconds(now, this.timerSeconds);
            const initTimerSeconds = this.timeDiffInSec(now, deadline);

            this.timerID = setInterval(() => {
                now = new Date();
                this.timerSeconds = this.timeDiffInSec(now, deadline);

                this.progressCircleFillPercent = (initTimerSeconds - this.timerSeconds) / initTimerSeconds;

                if (this.timerSeconds <= 0) {
                    this.stopTimer();
                }
            }, 1000);
        },

        addSeconds(date, seconds) {
            return new Date(date.getTime() + seconds * 1000);
        },

        timeDiffInSec(startDate, endDate) {
            return (Date.parse(endDate) - Date.parse(startDate)) / 1000;
        },

        toggleTimerType() {
            this.currentTimerType = this.currentTimerType === 'work' ? 'relax' : 'work';
        },
    },
};
</script>

<style lang="less">
.timer {
    &__progress-circle {
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
        transition: stroke-dashoffset 0.35s;
    }

    &__countdown {
        font-family: 'Roboto', sans-serif;
        user-select: none;
    }

    &__clickable-circle {
        cursor: pointer;

        &_type_work:hover {
            fill: #81c784;
        }
    }
}
</style>
