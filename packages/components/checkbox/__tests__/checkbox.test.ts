import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { MyCheckbox, MyCheckboxGroup } from '..'

describe('MyCheckbox', () => {
  it('单独使用时 v-model 布尔切换', async () => {
    const wrapper = mount(MyCheckbox, { props: { modelValue: false } })
    const input = wrapper.find('input')
    await input.setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('indeterminate 添加 is-indeterminate 类', () => {
    const wrapper = mount(MyCheckbox, {
      props: { modelValue: false, indeterminate: true },
    })
    expect(wrapper.classes()).toContain('is-indeterminate')
  })

  it('禁用时不触发更新', async () => {
    const wrapper = mount(MyCheckbox, {
      props: { modelValue: false, disabled: true },
    })
    await wrapper.find('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})

describe('MyCheckboxGroup', () => {
  const buildHost = (groupProps: Record<string, unknown>) =>
    defineComponent({
      emits: ['update:modelValue'],
      setup(_, { emit }) {
        return () =>
          h(
            MyCheckboxGroup,
            {
              ...groupProps,
              'onUpdate:modelValue': (value: unknown) => emit('update:modelValue', value),
            },
            () => [
              h(MyCheckbox, { value: 'a' }, () => 'A'),
              h(MyCheckbox, { value: 'b' }, () => 'B'),
              h(MyCheckbox, { value: 'c' }, () => 'C'),
            ],
          )
      },
    })

  it('group 数组形式 modelValue', async () => {
    const Host = buildHost({ modelValue: ['a'] })
    const wrapper = mount(Host)

    const items = wrapper.findAllComponents(MyCheckbox)
    expect(items[0].classes()).toContain('is-checked')

    await items[1].find('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a', 'b']])
  })

  it('max 限制达到上限后禁用未选中项', () => {
    const Host = buildHost({ modelValue: ['a'], max: 1 })
    const wrapper = mount(Host)

    const items = wrapper.findAllComponents(MyCheckbox)
    expect(items[1].classes()).toContain('is-disabled')
    expect(items[0].classes()).not.toContain('is-disabled')
  })
})
