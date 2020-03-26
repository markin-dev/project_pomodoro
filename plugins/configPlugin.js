const config = {
    TIMER_SIZE: 220,
    STROKE_WIDTH: 10,
    GREEN: '#66BB6A',
    LIGHT_GREEN: '#81C784',
    BLUE: '#42A5F5',
    LIGHT_BLUE: '#64B5F6',
    GRAY: '#424242',
    WORK_TIMER_SECONDS: 1500,
    RELAX_TIMER_SECONDS: 300,
    TIMER_STATUSES: {
        stopped: 'stopped',
        running: 'runnig',
    },
};

export default {
    install(Vue) {
        // eslint-disable-next-line
        Vue.prototype.$getConfig = (key) => config[key];
    },
};
