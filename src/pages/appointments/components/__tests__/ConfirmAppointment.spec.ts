import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ConfirmAppointment from '../ConfirmAppointment.vue';

describe('Appointments: ConfirmAppointment component', () => {
    it('renders date and button text correctly', () => {
        const wrapper = mount(ConfirmAppointment, {
            props: {
                date: '2023-06-24',
                loading: false
            }
        })

        expect(wrapper.html()).toContain('2023-06-24')

        const button = wrapper.find('button')
        expect(button.text()).toBe('2023-06-24')
    })

    it('disables the button when loading is true', () => {
        const wrapper = mount(ConfirmAppointment, {
            props: {
                date: '2023-06-24',
                loading: true
            }
        })

        const button = wrapper.find('button')
        expect(button.attributes('disabled')).toBeDefined()
    })

    it('emits confirmNewAppointment event on button click', async () => {
        const wrapper = mount(ConfirmAppointment, {
            props: {
                date: '2023-06-24',
                loading: false
            }
        })

        await wrapper.find('button').trigger('click')

        expect(wrapper.emitted()).toHaveProperty('confirmNewAppointment')
    })

    it('button is not clickable when loading is true', async () => {
        const wrapper = mount(ConfirmAppointment, {
            props: {
                date: '2023-06-24',
                loading: true
            }
        })

        await wrapper.find('button').trigger('click')

        expect(wrapper.emitted('confirmNewAppointment')).toBeUndefined()
    })
})