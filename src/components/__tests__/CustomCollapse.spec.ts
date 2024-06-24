import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CustomCollapse from '@/components/CustomCollapse.vue'

describe('CustomCollapse component', () => {
    it('renders with minimum height when not expanded', () => {
        const wrapper = mount(CustomCollapse, {
            props: {
                minHeight: 100,
                expanded: false
            }
        })

        // Check if the div has the correct height
        const div = wrapper.find('div');
        expect(div.element.style.height).toBe('100px');
    })

    it('renders with auto height when expanded', () => {
        const wrapper = mount(CustomCollapse, {
            props: {
                minHeight: 100,
                expanded: true
            }
        })

        // Check if the div has auto height
        const div = wrapper.find('div');
        expect(div.element.style.height).toBe('auto');
    })

    it('renders slot content correctly', () => {
        const wrapper = mount(CustomCollapse, {
            props: {
                minHeight: 100,
                expanded: false
            },
            slots: {
                default: '<p>Collapse Content</p>'
            }
        })

        // Check if the slot content is rendered
        expect(wrapper.html()).toContain('<p>Collapse Content</p>');
    })
})