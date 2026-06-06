import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { MyRadio, MyRadioGroup } from '..'

describe('MyRadio', () => {
  it('单独使用时通过 v-model 切换', async () => {
    const wrapper = mount(MyRadio, {
      props: { modelValue: 'a', value: 'b', label: '选项B' },
    })
    expect(wrapper.classes()).not.toContain('is-checked')

    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
  })

  it('禁用时不触发更新', async () => {
    const wrapper = mount(MyRadio, {
      props: { modelValue: 'a', value: 'b', disabled: true },
    })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.classes()).toContain('is-disabled')
  })
})

describe('MyRadioGroup', () => {
  const buildHost = (groupProps: Record<string, unknown>) =>
    defineComponent({
      components: { MyRadio, MyRadioGroup },
      props: { modelValue: { type: [String, Number, Boolean], default: undefined } },
      emits: ['update:modelValue'],
      setup(_, { emit }) {
        return () =>
          h(
            MyRadioGroup,
            {
              ...groupProps,
              'onUpdate:modelValue': (value: unknown) => emit('update:modelValue', value),
            },
            () => [
              h(MyRadio, { value: 'a' }, () => 'A'),
              h(MyRadio, { value: 'b' }, () => 'B'),
            ],
          )
      },
    })

  it('group 协调子项选中状态', async () => {
    const Host = buildHost({ modelValue: 'a' })
    const wrapper = mount(Host)

    const radios = wrapper.findAllComponents(MyRadio)
    expect(radios[0].classes()).toContain('is-checked')
    expect(radios[1].classes()).not.toContain('is-checked')

    await radios[1].find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
  })

  it('group 禁用透传到子项', () => {
    const Host = buildHost({ modelValue: 'a', disabled: true })
    const wrapper = mount(Host)

    const radios = wrapper.findAllComponents(MyRadio)
    expect(radios[0].classes()).toContain('is-disabled')
  })
})
