import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CurrentAppointment from '../CurrentAppointment.vue'

const IconMock = () => {
    return `<svg data-testid="test-icon-mocked"></svg>`
};

describe('Appointments: CurrentAppointment component', () => {
    it('renders the correct doctor name', () => {
        const wrapper = mount(CurrentAppointment, {
            props: {
                date: '2023-06-24',
                doctor: 'Dr. Simeon',
                loading: false
            },
            global: {
                stubs: {
                    'v-icon': IconMock
                }
            }
        })

        expect(wrapper.text()).toContain('Confirm your appointment with');
        const span = wrapper.find('strong');
        expect(span.text()).toContain('Dr. Simeon');
    })

    it('renders the correct appointment date', () => {
        const wrapper = mount(CurrentAppointment, {
            props: {
                date: '2023-06-24',
                doctor: 'Dr. Simeon',
                loading: false
            },
            global: {
                stubs: {
                    'v-icon': IconMock
                }
            }
        })

        const span = wrapper.find('span')
        expect(span.text()).toContain('On 2023-06-24')
    })

    it('applies the correct class to the date span based on loading state', async () => {
        const wrapper = mount(CurrentAppointment, {
            props: {
                date: '2023-06-24',
                doctor: 'Dr. Simeon',
                loading: false
            },
            global: {
                stubs: {
                    'v-icon': IconMock
                }
            }
        })

        // Check if the span does not have the loading class when loading is false
        let span = wrapper.find('span');
        expect(span.classes()).not.toContain('loading');

        // Set loading to true and check if the span has the loading class
        await wrapper.setProps({ loading: true });
        span = wrapper.find('span');
        expect(span.classes()).toContain('loading');
    })
})