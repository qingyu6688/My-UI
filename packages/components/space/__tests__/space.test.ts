import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { MySpace } from '..'

describe('MySpace', () => {
  it('按默认尺寸渲染间距', () => {
    const wrapper = mount(MySpace, {
      slots: {
        default: () => [h('span', '一'), h('span', '二')],
      },
    })
    const style = wrapper.attributes('style') ?? ''
    expect(style).toContain('column-gap: 12px')
    expect(wrapper.classes()).toContain('my-space--horizontal')
    expect(wrapper.findAll('.my-space__item')).toHaveLength(2)
  })

  it('支持数字尺寸', () => {
    const wrapper = mount(MySpace, {
      props: { size: 24 },
      slots: { default: () => [h('span', 'a')] },
    })
    expect(wrapper.attributes('style')).toContain('column-gap: 24px')
  })

  it('separator slot 出现在子项之间', () => {
    const wrapper = mount(MySpace, {
      slots: {
        default: () => [h('span', 'a'), h('span', 'b'), h('span', 'c')],
        separator: () => '|',
      },
    })
    expect(wrapper.findAll('.my-space__separator')).toHaveLength(2)
  })

  it('vertical 方向附加纵向类', () => {
    const wrapper = mount(MySpace, {
      props: { direction: 'vertical' },
      slots: { default: () => [h('span', 'a')] },
    })
    expect(wrapper.classes()).toContain('my-space--vertical')
  })
})
