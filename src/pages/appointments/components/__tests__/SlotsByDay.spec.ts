import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { format, startOfTomorrow } from 'date-fns'
import SlotsByDay from '../SlotsByDay.vue'
import type { ISlot } from '@/types'

const mockSlots: ISlot[] = [
    { start: new Date(2024, 4, 21, 9, 20).toDateString(), end: new Date(2024, 4, 21, 9, 30).toDateString(), taken: false },
    { start: new Date(2024, 4, 21, 10, 20).toDateString(), end: new Date(2024, 4, 21, 10, 30).toDateString(), taken: true },
]

describe('Appointments: SlotsByDay component', () => {
    it('renders "Today" as weekDay for the current day', () => {
        const day = new Date();
        const wrapper = mount(SlotsByDay, {
            props: {
                day,
                slots: mockSlots,
            },
        })

        const weekDay = wrapper.find('.weekDay').text()

        expect(weekDay).toBe('Today');
    })
    it('renders "Tomorrow" as weekDay for the tomorrow day', () => {
        const day = startOfTomorrow();
        const wrapper = mount(SlotsByDay, {
            props: {
                day,
                slots: mockSlots,
            },
        })

        const weekDay = wrapper.find('.weekDay').text()

        expect(weekDay).toBe('Tomorrow');
    })
    it('renders the correct weekday and short day', () => {
        const day = new Date(2024, 6, 21)
        const wrapper = mount(SlotsByDay, {
            props: {
                day,
                slots: mockSlots,
            },
        })

        const weekDay = wrapper.find('.weekDay').text()
        const shortDay = wrapper.find('.shortDay').text()

        expect(weekDay).toBe(format(day, 'EEE'))
        expect(shortDay).toBe(format(day, 'dd LLL'))
    })

    it('renders slots correctly and highlights selected slot', () => {
        const selectedSlot = mockSlots[0]
        const wrapper = mount(SlotsByDay, {
            props: {
                day: new Date(2024, 4, 21),
                slots: mockSlots,
                appointmentSelected: selectedSlot,
            },
        })

        const buttons = wrapper.findAll('button')
        const spans = wrapper.findAll('span')

        expect(buttons).toHaveLength(1) // One slot is available
        expect(spans).toHaveLength(1) // One slot is taken

        expect(buttons[0].text()).toBe(format(selectedSlot.start, 'HH:mm'))
        expect(buttons[0].classes()).toContain('selected')
    })

    it('emits selectDate event when an available slot is clicked', async () => {
        const wrapper = mount(SlotsByDay, {
            props: {
                day: new Date(2024, 4, 21),
                slots: mockSlots,
            },
        })

        const button = wrapper.find('button')
        await button.trigger('click')

        const emitted = wrapper.emitted('selectDate')
        expect(emitted).toHaveLength(1)
        expect(emitted?.[0]).toEqual([{ start: mockSlots[0].start, end: mockSlots[0].end }])
    })

    it('formats time correctly for slot buttons and spans', () => {
        const wrapper = mount(SlotsByDay, {
            props: {
                day: new Date(2024, 4, 21),
                slots: mockSlots,
            },
        })

        const button = wrapper.find('button')
        const span = wrapper.find('span')

        expect(button.text()).toBe(format(mockSlots[0].start, 'HH:mm'))
        expect(span.text()).toBe(format(mockSlots[1].start, 'HH:mm'))
    })
})