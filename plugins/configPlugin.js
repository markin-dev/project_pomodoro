import * as config from '../constatns';

export default {
    install(Vue) {
        // eslint-disable-next-line
        Vue.prototype.$getConfig = (key) => config[key];
    },
};
