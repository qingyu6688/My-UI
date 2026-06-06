import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyInput } from '..'

describe('MyInput', () => {
  it('双向绑定 modelValue', async () => {
    const wrapper = mount(MyInput, { props: { modelValue: 'hi' } })
    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).value).toBe('hi')

    await input.setValue('hello')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
    expect(wrapper.emitted('input')?.[0]).toEqual(['hello'])
  })

  it('禁用时不接受输入', () => {
    const wrapper = mount(MyInput, { props: { disabled: true } })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('clearable 在悬停且有值时显示清空按钮', async () => {
    const wrapper = mount(MyInput, {
      props: { modelValue: 'x', clearable: true },
    })
    await wrapper.trigger('mouseenter')
    const clearBtn = wrapper.find('button[aria-label="清空"]')
    expect(clearBtn.exists()).toBe(true)

    await clearBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  it('密码切换显示与隐藏', async () => {
    const wrapper = mount(MyInput, {
      props: { type: 'password', showPassword: true, modelValue: 'p' },
    })
    expect(wrapper.find('input').attributes('type')).toBe('password')

    await wrapper.find('button[aria-label="显示密码"]').trigger('click')
    expect(wrapper.find('input').attributes('type')).toBe('text')
  })

  it('textarea 渲染并显示字数统计', () => {
    const wrapper = mount(MyInput, {
      props: {
        type: 'textarea',
        modelValue: 'abc',
        showWordLimit: true,
        maxlength: 100,
      },
    })
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('.my-input__count').text()).toBe('3/100')
  })
})
