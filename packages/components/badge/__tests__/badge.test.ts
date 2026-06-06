import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyBadge } from '..'

describe('MyBadge', () => {
  it('渲染数值', () => {
    const wrapper = mount(MyBadge, { props: { value: 5 } })
    expect(wrapper.find('.my-badge__content').text()).toBe('5')
  })

  it('超过 max 显示 max+', () => {
    const wrapper = mount(MyBadge, { props: { value: 120, max: 99 } })
    expect(wrapper.find('.my-badge__content').text()).toBe('99+')
  })

  it('isDot 模式无文本且加 is-dot 类', () => {
    const wrapper = mount(MyBadge, { props: { value: 5, isDot: true } })
    const dot = wrapper.find('.my-badge__content')
    expect(dot.classes()).toContain('is-dot')
    expect(dot.text()).toBe('')
  })

  it('value 为 0 且 showZero=false 时隐藏', () => {
    const wrapper = mount(MyBadge, { props: { value: 0 } })
    expect(wrapper.find('.my-badge__content').exists()).toBe(false)
  })

  it('hidden 时隐藏', () => {
    const wrapper = mount(MyBadge, { props: { value: 5, hidden: true } })
    expect(wrapper.find('.my-badge__content').exists()).toBe(false)
  })
})
