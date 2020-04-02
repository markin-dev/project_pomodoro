// изменение констант не должно влиять на тесты

import { shallowMount, createLocalVue } from '@vue/test-utils';
import startButton from './start-button.vue';
import {
    TIMER_SIZE,
    BLUE,
    LIGHT_BLUE,
} from '../constatns';
import configPlugin from '../plugins/configPlugin';

describe('start-button.vue', () => {
    it('has the expected html structure', () => {
        const localVue = createLocalVue();

        localVue.use(configPlugin);

        const wrapper = shallowMount(startButton, {
            localVue,
            propsData: {
                radius: TIMER_SIZE,
                color: BLUE,
                hoverColor: LIGHT_BLUE,
            },
        });

        expect(wrapper.element).toMatchSnapshot();
    });
});
