// изменение констант не должно влиять на тесты

import { shallowMount, createLocalVue } from '@vue/test-utils';
import pomodoroTimer from './pomodoro-timer.vue';
import configPlugin from '../plugins/configPlugin';

describe('pomodoro-timer.vue', () => {
    let localVue;
    const wrapperFactory = () => shallowMount(pomodoroTimer, {
        localVue,
    });

    beforeEach(() => {
        localVue = createLocalVue();
        localVue.use(configPlugin);
    });

    it('has the expected html structure', () => {
        const wrapper = wrapperFactory();

        expect(wrapper.element).toMatchSnapshot();
    });

    it('correct start time is displayed', () => {
        const wrapper = wrapperFactory();

        const timerText = wrapper.find('.timer__countdown');

        expect(timerText.text()).toBe('00:00');
    });
});
