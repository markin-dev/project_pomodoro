<template>
    <div>
        <button
            style="user-select: none"
            @click="test"
        >
            hello
        </button>
    </div>
</template>

<script>
export default {
    methods: {
        test() {
            console.log('lul');
        },
    },
};
</script>

<style lang="less" scoped>
button {
    -webkit-font-smoothing: antialiased;
    text-size-adjust: 100%;
    box-sizing: inherit;
    margin: 0;
    font-family: BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
    user-select: none;
    -webkit-appearance: none;
    align-items: center;
    border: 1px solid transparent;
    border-radius: 4px;
    box-shadow: none;
    display: inline-flex;
    font-size: 1rem;
    height: 2.5em;
    line-height: 1.5;
    position: relative;
    vertical-align: top;
    border-width: 1px;
    cursor: pointer;
    justify-content: center;
    padding-bottom: calc(.5em - 1px);
    padding-left: 1em;
    padding-right: 1em;
    padding-top: calc(.5em - 1px);
    text-align: center;
    white-space: nowrap;
    background-color: #ffdd57;
    border-color: transparent;
    color: rgba(0,0,0,.7);
    margin-bottom: .5rem;
    margin-right: .5rem;
    outline: none;
    user-select: none;

    &:hover {
        -webkit-font-smoothing: antialiased;
        text-size-adjust: 100%;
        box-sizing: inherit;
        margin: 0;
        font-family: BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
        user-select: none;
        -webkit-appearance: none;
        align-items: center;
        border: 1px solid transparent;
        border-radius: 4px;
        box-shadow: none;
        display: inline-flex;
        font-size: 1rem;
        height: 2.5em;
        line-height: 1.5;
        position: relative;
        vertical-align: top;
        border-width: 1px;
        cursor: pointer;
        justify-content: center;
        padding-bottom: calc(.5em - 1px);
        padding-left: 1em;
        padding-right: 1em;
        padding-top: calc(.5em - 1px);
        text-align: center;
        white-space: nowrap;
        margin-bottom: .5rem;
        background-color: #ffdb4a;
        border-color: transparent;
        color: rgba(0,0,0,.7);
        margin-right: .5rem;
        user-select: none;
    }
}
</style>
