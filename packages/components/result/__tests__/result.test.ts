import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyResult } from '..'

describe('MyResult', () => {
  it('渲染标题与副标题', () => {
    const wrapper = mount(MyResult, { props: { title: '成功', subTitle: '操作已完成' } })
    expect(wrapper.find('.my-result__title').text()).toBe('成功')
    expect(wrapper.find('.my-result__subtitle').text()).toBe('操作已完成')
  })

  it('status 应用图标类', () => {
    const wrapper = mount(MyResult, { props: { status: 'success' } })
    expect(wrapper.find('.my-result__icon--success').exists()).toBe(true)
  })

  it('extra 插槽渲染操作区', () => {
    const wrapper = mount(MyResult, { slots: { extra: '<button>返回</button>' } })
    expect(wrapper.find('.my-result__extra').exists()).toBe(true)
  })
})
