<template>
    <div class="grid">
        <btn
            v-for="title in soundTitles"
            :key="`${title}-index`"
            class="grid__btn"
            width="90px"
            @click="playSound"
        >
            {{ title }}
        </btn>
    </div>
</template>

<script>
import btn from './button.vue';

import piu from '../assets/piu.m4a';

export default {
    components: {
        btn,
    },

    data() {
        return {
            soundTitles: [
                'pip',
                'pop',
                'bum',
                'biiiu',
                'test',
                'test5',
                'tadada',
                'trin',
                'zzz',
            ],
        };
    },

    methods: {
        playSound() {
            const audioAlert = new Audio(piu);

            audioAlert.play();
        },
    },
};
</script>

<style lang="less" scoped>
.grid {
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    margin-top: 30px;

}
</style>
