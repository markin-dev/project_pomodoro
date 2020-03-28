<template>
    <button
        :style="`width: ${width}`"
        @click="$emit('click')"
    >
        <slot />
    </button>
</template>

<script>
export default {
    props: {
        width: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="less" scoped>
button {
    margin: 0;
    font-family: Roboto, sans-serif;
    border: 1px solid transparent;
    border-radius: 4px;
    box-shadow: none;
    font-size: 20px;
    line-height: 1.5;
    cursor: pointer;
    padding-bottom: calc(.5em - 1px);
    padding-left: 1em;
    padding-right: 1em;
    padding-top: calc(.5em - 1px);
    background-color: #ffdd57;
    color: rgba(0,0,0,.7);
    margin-bottom: .5rem;
    margin-right: .5rem;
    outline: none;
    user-select: none;

    &:hover {
        background-color: #ffdb4a;
    }
}
</style>
