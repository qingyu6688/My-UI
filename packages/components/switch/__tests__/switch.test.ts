import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MySwitch } from '..'

describe('MySwitch', () => {
  it('点击切换布尔 modelValue', async () => {
    const wrapper = mount(MySwitch, { props: { modelValue: false } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('支持自定义 activeValue / inactiveValue', async () => {
    const wrapper = mount(MySwitch, {
      props: { modelValue: 'off', activeValue: 'on', inactiveValue: 'off' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['on'])
  })

  it('禁用与 loading 时不触发更新', async () => {
    const disabled = mount(MySwitch, { props: { modelValue: false, disabled: true } })
    await disabled.trigger('click')
    expect(disabled.emitted('update:modelValue')).toBeUndefined()

    const loading = mount(MySwitch, { props: { modelValue: false, loading: true } })
    await loading.trigger('click')
    expect(loading.emitted('update:modelValue')).toBeUndefined()
    expect(loading.classes()).toContain('is-loading')
  })

  it('aria-checked 反映当前状态', async () => {
    const wrapper = mount(MySwitch, { props: { modelValue: true } })
    expect(wrapper.attributes('aria-checked')).toBe('true')
    expect(wrapper.attributes('role')).toBe('switch')
  })

  it('键盘 Space 触发切换', async () => {
    const wrapper = mount(MySwitch, { props: { modelValue: false } })
    await wrapper.trigger('keydown', { key: ' ' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })
})
