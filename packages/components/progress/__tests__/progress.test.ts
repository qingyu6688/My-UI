import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyProgress } from '..'

describe('MyProgress', () => {
  it('线形进度按百分比设置宽度', () => {
    const wrapper = mount(MyProgress, { props: { percentage: 40 } })
    expect(wrapper.find('.my-progress__bar').attributes('style')).toContain('width: 40%')
    expect(wrapper.find('.my-progress__text').text()).toBe('40%')
  })

  it('百分比超出范围被夹紧', () => {
    const over = mount(MyProgress, { props: { percentage: 150 } })
    expect(over.find('.my-progress__text').text()).toBe('100%')
    const under = mount(MyProgress, { props: { percentage: -10 } })
    expect(under.find('.my-progress__text').text()).toBe('0%')
  })

  it('status 添加状态类', () => {
    const wrapper = mount(MyProgress, { props: { percentage: 100, status: 'success' } })
    expect(wrapper.classes()).toContain('is-success')
  })

  it('circle 类型渲染 svg', () => {
    const wrapper = mount(MyProgress, { props: { percentage: 60, type: 'circle' } })
    expect(wrapper.find('.my-progress__circle svg').exists()).toBe(true)
    expect(wrapper.find('.my-progress__circle-text').text()).toBe('60%')
  })

  it('showText=false 不渲染文字', () => {
    const wrapper = mount(MyProgress, { props: { percentage: 30, showText: false } })
    expect(wrapper.find('.my-progress__text').exists()).toBe(false)
  })
})
