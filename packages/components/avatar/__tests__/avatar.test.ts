import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyAvatar } from '..'

describe('MyAvatar', () => {
  it('有 src 时渲染图片', () => {
    const wrapper = mount(MyAvatar, { props: { src: 'a.png', alt: '头像' } })
    expect(wrapper.find('img.my-avatar__image').exists()).toBe(true)
  })

  it('无 src 时渲染文字回退', () => {
    const wrapper = mount(MyAvatar, { props: { alt: '张' } })
    expect(wrapper.find('.my-avatar__fallback').text()).toBe('张')
  })

  it('图片加载失败回退并触发 error', async () => {
    const wrapper = mount(MyAvatar, { props: { src: 'bad.png', alt: '李' } })
    await wrapper.find('img').trigger('error')
    expect(wrapper.emitted('error')).toHaveLength(1)
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('.my-avatar__fallback').text()).toBe('李')
  })

  it('shape 与 size 类', () => {
    const wrapper = mount(MyAvatar, { props: { shape: 'square', size: 'large' } })
    expect(wrapper.classes()).toContain('my-avatar--square')
    expect(wrapper.classes()).toContain('my-avatar--large')
  })

  it('数字 size 写入行内样式', () => {
    const wrapper = mount(MyAvatar, { props: { size: 64 } })
    expect(wrapper.attributes('style')).toContain('width: 64px')
  })
})
