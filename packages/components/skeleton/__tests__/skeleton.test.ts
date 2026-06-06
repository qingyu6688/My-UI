import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MySkeleton } from '..'

describe('MySkeleton', () => {
  it('loading 时渲染指定行数', () => {
    const wrapper = mount(MySkeleton, { props: { rows: 4 } })
    expect(wrapper.findAll('.my-skeleton__row')).toHaveLength(4)
  })

  it('loading 为 false 时渲染内容', () => {
    const wrapper = mount(MySkeleton, {
      props: { loading: false },
      slots: { default: '<p>真实内容</p>' },
    })
    expect(wrapper.find('.my-skeleton').exists()).toBe(false)
    expect(wrapper.text()).toContain('真实内容')
  })

  it('avatar 渲染头像占位', () => {
    const wrapper = mount(MySkeleton, { props: { avatar: true } })
    expect(wrapper.find('.my-skeleton__avatar').exists()).toBe(true)
  })
})
