import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyLink } from '..'

describe('MyLink', () => {
  it('渲染 a 标签并带默认类', () => {
    const wrapper = mount(MyLink, { slots: { default: '文档' } })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.classes()).toContain('my-link--default')
    expect(wrapper.classes()).toContain('my-link--underline-hover')
  })

  it('外链自动加 rel 与 is-external 类', () => {
    const wrapper = mount(MyLink, {
      props: { href: 'https://example.com', target: '_blank' },
    })
    expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
    expect(wrapper.classes()).toContain('is-external')
  })

  it('禁用时不触发点击并去掉 href', () => {
    const wrapper = mount(MyLink, {
      props: { disabled: true, href: '/x' },
    })
    expect(wrapper.attributes('href')).toBeUndefined()
    wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('正常状态下触发 click', async () => {
    const wrapper = mount(MyLink, { props: { href: '#' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})
