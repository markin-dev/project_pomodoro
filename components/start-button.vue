<template>
    <svg
        class="start-button"
        @click="$emit('click')"
    >
        <circle
            :r="radius"
            :cx="$getConfig('TIMER_SIZE') / 2"
            :cy="$getConfig('TIMER_SIZE') / 2"
            :fill="$getConfig('GREEN')"
            class="start-button_type_work"
        />
        <svg
            :width="$getConfig('TIMER_SIZE') * 0.4"
            :height="$getConfig('TIMER_SIZE') * 0.4"
            :x="$getConfig('TIMER_SIZE') * 0.34"
            :y="$getConfig('TIMER_SIZE') * 0.30"
            viewBox="0 0 69 88"
            fill="none"
        >
            <path
                d="M0.92453 0.4151V87.1698L69 43.7925L0.92453 0.4151Z"
                fill="#EEEEEE"
            />
        </svg>
    </svg>
</template>

<script>
export default {
    props: [
        'radius',
    ],
};
</script>

<style lang="less" scoped>
.start-button {
    cursor: pointer;

    &_type_work:hover {
        fill: #81c784;
    }
}
</style>
