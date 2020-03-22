<template>
    <div id="app">
        <svg
            class="timer"
            :height="this.$getConfig('TIMER_SIZE')"
            :width="this.$getConfig('TIMER_SIZE')"
        >
            <circle
                :stroke-width="this.$getConfig('STROKE_WIDTH')"
                :r="circleRadius"
                :cx="this.$getConfig('TIMER_SIZE') / 2"
                :cy="this.$getConfig('TIMER_SIZE') / 2"
                :stroke="$getConfig('GRAY')"
                fill="transparent"
            />
            <circle
                :stroke-width="this.$getConfig('STROKE_WIDTH')"
                :r="circleRadius"
                :cx="this.$getConfig('TIMER_SIZE') / 2"
                :cy="this.$getConfig('TIMER_SIZE') / 2"
                :stroke="$getConfig('GREEN')"
                :style="circleStyles"
                class="timer__progress-circle"
                fill="transparent"
            />
        </svg>
    </div>
</template>

<script>
export default {
    computed: {
        circleRadius() {
            return this.$getConfig('TIMER_SIZE') / 2 - this.$getConfig('STROKE_WIDTH') * 2;
        },

        circumference() {
            return this.circleRadius * 2 * Math.PI;
        },

        circleStyles() {
            return {
                strokeDashoffset: this.circumference - 0.5 * this.circumference,
                strokeDasharray: `${this.circumference} ${this.circumference}`,
            };
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
</style>
