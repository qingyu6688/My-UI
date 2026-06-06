import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyAlert } from '..'

describe('MyAlert', () => {
  it('渲染标题与描述', () => {
    const wrapper = mount(MyAlert, {
      props: { title: '提示', description: '详情' },
    })
    expect(wrapper.find('.my-alert__title').text()).toBe('提示')
    expect(wrapper.find('.my-alert__description').text()).toBe('详情')
  })

  it('type 添加对应类', () => {
    const wrapper = mount(MyAlert, { props: { type: 'warning' } })
    expect(wrapper.find('.my-alert').classes()).toContain('my-alert--warning')
  })

  it('点击关闭按钮触发 close 并隐藏', async () => {
    const wrapper = mount(MyAlert, { props: { closable: true, title: '测试' } })
    await wrapper.find('.my-alert__close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.find('.my-alert').exists()).toBe(false)
  })

  it('closable false 不显示关闭按钮', () => {
    const wrapper = mount(MyAlert, { props: { closable: false } })
    expect(wrapper.find('.my-alert__close').exists()).toBe(false)
  })

  it('showIcon 时渲染图标', () => {
    const wrapper = mount(MyAlert, { props: { type: 'success', showIcon: true } })
    expect(wrapper.find('.my-alert__icon').text()).toBe('✓')
  })
})
