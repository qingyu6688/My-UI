import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyText } from '..'

describe('MyText', () => {
  it('渲染默认 span 标签', () => {
    const wrapper = mount(MyText, { slots: { default: '说明' } })
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('my-text--default')
    expect(wrapper.text()).toBe('说明')
  })

  it('支持自定义 tag', () => {
    const wrapper = mount(MyText, { props: { tag: 'p' } })
    expect(wrapper.element.tagName).toBe('P')
  })

  it('truncated 时附加单行省略类', () => {
    const wrapper = mount(MyText, { props: { truncated: true } })
    expect(wrapper.classes()).toContain('is-truncated')
  })

  it('lineClamp 大于 0 时输出多行截断样式', () => {
    const wrapper = mount(MyText, { props: { lineClamp: 2 } })
    const style = wrapper.attributes('style') ?? ''
    expect(style).toContain('-webkit-line-clamp: 2')
    expect(wrapper.classes()).toContain('is-clamp')
  })
})
