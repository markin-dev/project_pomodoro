<template>
    <svg
        class="start-button"
        @click="$emit('click')"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <circle
            :r="radius"
            :cx="$getConfig('TIMER_SIZE') / 2"
            :cy="$getConfig('TIMER_SIZE') / 2"
            :fill="color"
            :style="{fill: isHovered ? hoverColor : color}"
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
    props: {
        radius: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        hoverColor: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            isHovered: false,
        };
    },
};
</script>

<style lang="less" scoped>
.start-button {
    cursor: pointer;
}
</style>
