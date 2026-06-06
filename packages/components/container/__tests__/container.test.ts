import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { MyAside, MyContainer, MyMain } from '..'

describe('MyContainer', () => {
  it('含 Aside 时为横向布局', () => {
    const wrapper = mount(MyContainer, {
      slots: { default: () => [h(MyAside, () => '侧'), h(MyMain, () => '主')] },
    })
    expect(wrapper.classes()).not.toContain('is-vertical')
  })

  it('无 Aside 时为纵向布局', () => {
    const wrapper = mount(MyContainer, {
      slots: { default: () => [h(MyMain, () => '主')] },
    })
    expect(wrapper.classes()).toContain('is-vertical')
  })

  it('direction 显式指定优先', () => {
    const wrapper = mount(MyContainer, {
      props: { direction: 'vertical' },
      slots: { default: () => [h(MyAside, () => '侧')] },
    })
    expect(wrapper.classes()).toContain('is-vertical')
  })
})
