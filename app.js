import Vue from 'vue';
import Main from './components/main.vue';

const app = new Vue({
    render: h => h(Main),
}).$mount('#app');
