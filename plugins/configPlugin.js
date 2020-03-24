const config = {
    TIMER_SIZE: 220,
    STROKE_WIDTH: 10,
    GREEN: '#66BB6A',
    GRAY: '#424242',
    TEMP_TIMER_TIME: 60,
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
