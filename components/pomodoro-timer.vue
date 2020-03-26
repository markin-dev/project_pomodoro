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
            timerTime: 0,
            progressCircleFillPercent: 0,
            timerStatus: this.$getConfig('TIMER_STATUSES').stopped,
            currentTimerType: 'work',
            timerTypes: {
                work: {
                    time: this.$getConfig('WORK_TIMER_TIME'),
                    color: this.$getConfig('BLUE'),
                    hoverColor: this.$getConfig('LIGHT_BLUE'),
                },
                relax: {
                    time: this.$getConfig('RELAX_TIMER_TIME'),
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
            let minutes = parseInt(this.timerTime / 60, 10);
            let seconds = parseInt(this.timerTime % 60, 10);

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
            this.timerTime = this.timerTypes[this.currentTimerType].time;
            this.timerStatus = this.$getConfig('TIMER_STATUSES').running;
            this.countdown();
        },

        stopTimer() {
            this.timerStatus = this.$getConfig('TIMER_STATUSES').stopped;
            this.timerTime = this.$getConfig('TEMP_TIMER_TIME');
            this.progressCircleFillPercent = 0;
            this.toggleTimerType();
            clearInterval(this.timerID);
        },

        countdown() {
            const initTimerTime = this.timerTime;
            this.timerID = setInterval(() => {
                this.timerTime -= 1;
                this.progressCircleFillPercent = (initTimerTime - this.timerTime) / initTimerTime;

                if (this.timerTime <= 0) {
                    clearInterval(this.timerID);
                }
            }, 1000);
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
        font-size: 60px;
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
