import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyImage } from '..'

describe('MyImage', () => {
  it('渲染 img 并应用 fit', () => {
    const wrapper = mount(MyImage, { props: { src: 'a.png', fit: 'contain' } })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('a.png')
    expect(img.attributes('style')).toContain('object-fit: contain')
  })

  it('加载失败显示错误占位', async () => {
    const wrapper = mount(MyImage, { props: { src: 'bad.png' } })
    await wrapper.find('img').trigger('error')
    expect(wrapper.find('.my-image__error').exists()).toBe(true)
  })

  it('加载成功隐藏占位', async () => {
    const wrapper = mount(MyImage, { props: { src: 'a.png' } })
    await wrapper.find('img').trigger('load')
    expect(wrapper.find('.my-image__placeholder').exists()).toBe(false)
  })
})
