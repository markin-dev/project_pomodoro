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
                :stroke="$getConfig('GREEN')"
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
                :fill="`${$getConfig('GREEN')}`"
            >
                {{ `${formattedTime}` }}
            </text>
            <circle
                :r="circleRadius + $getConfig('STROKE_WIDTH') / 2"
                :cx="$getConfig('TIMER_SIZE') / 2"
                :cy="$getConfig('TIMER_SIZE') / 2"
                fill="transparent"
                @click="changeState"
            />
        </svg>
    </div>
</template>

<script>
export default {
    data() {
        return {
            timerTime: this.$getConfig('TEMP_TIMER_TIME'),
            progressCircleFillPercent: 0,
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

    mounted() {
        this.countdown();
    },

    methods: {
        countdown() {
            const initTimerTime = this.timerTime;
            const cd = setInterval(() => {
                this.timerTime -= 1;
                this.progressCircleFillPercent = (initTimerTime - this.timerTime) / initTimerTime;

                if (this.timerTime <= 0) {
                    clearInterval(cd);
                }
            }, 1000);
        },

        changeState() {
            console.log('CLICKED');
        },
    },
};
</script>

<style lang="less">
.timer__progress-circle {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    transition: stroke-dashoffset 0.35s;
}

.timer__countdown {
    font-family: 'Roboto', sans-serif;
    font-size: 60px;
    user-select: none;
}
</style>
