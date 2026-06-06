import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyDivider } from '..'

describe('MyDivider', () => {
  it('默认渲染水平分隔线', () => {
    const wrapper = mount(MyDivider)
    expect(wrapper.classes()).toContain('my-divider--horizontal')
    expect(wrapper.attributes('role')).toBe('separator')
    expect(wrapper.attributes('aria-orientation')).toBe('horizontal')
  })

  it('有插槽时渲染内容并附加 has-content 类', () => {
    const wrapper = mount(MyDivider, { slots: { default: '或' } })
    expect(wrapper.classes()).toContain('has-content')
    expect(wrapper.find('.my-divider__content').text()).toBe('或')
  })

  it('vertical 方向无内容', () => {
    const wrapper = mount(MyDivider, {
      props: { direction: 'vertical' },
      slots: { default: '不会渲染' },
    })
    expect(wrapper.classes()).toContain('my-divider--vertical')
    expect(wrapper.find('.my-divider__content').exists()).toBe(false)
  })

  it('borderStyle 反映到行内样式', () => {
    const wrapper = mount(MyDivider, { props: { borderStyle: 'dashed' } })
    expect(wrapper.attributes('style')).toContain('border-style: dashed')
  })
})
