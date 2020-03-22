const config = {
    TIMER_SIZE: 220,
    STROKE_WIDTH: 10,
    GREEN: '#66BB6A',
    GRAY: '#424242',
};

export default {
    install(Vue) {
        // eslint-disable-next-line
        Vue.prototype.$getConfig = (key) => config[key];
    },
};
