import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyCard } from '..'

describe('MyCard', () => {
  it('渲染默认内容与 always 阴影', () => {
    const wrapper = mount(MyCard, { slots: { default: '内容' } })
    expect(wrapper.classes()).toContain('my-card--shadow-always')
    expect(wrapper.find('.my-card__body').text()).toBe('内容')
  })

  it('header prop 渲染头部', () => {
    const wrapper = mount(MyCard, { props: { header: '标题' } })
    expect(wrapper.find('.my-card__header').text()).toBe('标题')
  })

  it('footer slot 渲染底部', () => {
    const wrapper = mount(MyCard, { slots: { footer: '底部' } })
    expect(wrapper.find('.my-card__footer').text()).toBe('底部')
  })

  it('无 header/footer 时不渲染对应区域', () => {
    const wrapper = mount(MyCard)
    expect(wrapper.find('.my-card__header').exists()).toBe(false)
    expect(wrapper.find('.my-card__footer').exists()).toBe(false)
  })
})
