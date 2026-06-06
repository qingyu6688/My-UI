import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { MyIcon } from '..'

describe('MyIcon', () => {
  it('默认渲染 i 标签并隐藏于辅助技术', () => {
    const wrapper = mount(MyIcon, {
      slots: { default: () => h('svg') },
    })
    expect(wrapper.element.tagName).toBe('I')
    expect(wrapper.attributes('aria-hidden')).toBe('true')
  })

  it('label 存在时暴露为可访问图像', () => {
    const wrapper = mount(MyIcon, {
      props: { label: '搜索' },
      slots: { default: () => h('svg') },
    })
    expect(wrapper.attributes('role')).toBe('img')
    expect(wrapper.attributes('aria-label')).toBe('搜索')
  })

  it('数字 size 转 px', () => {
    const wrapper = mount(MyIcon, { props: { size: 20 } })
    const style = wrapper.attributes('style') ?? ''
    expect(style).toContain('font-size: 20px')
    expect(style).toContain('width: 20px')
  })

  it('spin 增加旋转类，rotate 写入 transform', () => {
    const wrapper = mount(MyIcon, { props: { spin: true, rotate: 90 } })
    expect(wrapper.classes()).toContain('is-spin')
    expect(wrapper.attributes('style')).toContain('transform: rotate(90deg)')
  })
})
