import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MySplitter } from '..'

describe('MySplitter', () => {
  it('按 initial 设置初始比例', () => {
    const wrapper = mount(MySplitter, {
      props: { initial: 30 },
      slots: { start: '<div>左</div>', end: '<div>右</div>' },
    })
    const panels = wrapper.findAll('.my-splitter__panel')
    expect(panels[0].attributes('style')).toContain('flex-basis: 30%')
    expect(panels[1].attributes('style')).toContain('flex-basis: 70%')
  })

  it('渲染分隔条', () => {
    const wrapper = mount(MySplitter)
    expect(wrapper.find('.my-splitter__bar').exists()).toBe(true)
  })
})
