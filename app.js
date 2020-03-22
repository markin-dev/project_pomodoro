import Vue from 'vue';
import Main from './components/main.vue';
import timerConfig from './plugins/configPlugin';

Vue.use(timerConfig);

new Vue({
    render: (h) => h(Main),
}).$mount('#app');
