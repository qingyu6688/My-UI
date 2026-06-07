import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyStatistic } from '..'

describe('MyStatistic', () => {
  it('千分位分组与精度', () => {
    const wrapper = mount(MyStatistic, { props: { value: 1234567.5, precision: 2 } })
    expect(wrapper.find('.my-statistic__value').text()).toBe('1,234,567.50')
  })

  it('前后缀渲染', () => {
    const wrapper = mount(MyStatistic, { props: { value: 99, prefix: '￥', suffix: '元' } })
    expect(wrapper.text()).toContain('￥')
    expect(wrapper.text()).toContain('元')
  })
})
