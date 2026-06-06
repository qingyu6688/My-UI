/* eslint-disable vue/one-component-per-file */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, reactive, ref } from 'vue'
import { MyForm, MyFormItem } from '..'

interface FormExposes {
  validate: () => Promise<boolean>
  resetFields: () => void
  clearValidate: () => void
}

describe('MyForm', () => {
  it('validate 在必填为空时返回 false', async () => {
    const Host = defineComponent({
      setup(_, { expose }) {
        const formRef = ref<FormExposes | null>(null)
        const model = reactive<{ name: string }>({ name: '' })
        const rules = { name: [{ required: true, message: '名称必填' }] }
        expose({ formRef, model })
        return () =>
          h(
            MyForm,
            { ref: formRef, model, rules },
            () => [h(MyFormItem, { prop: 'name', label: '名称' }, () => h('input'))],
          )
      },
    })
    const wrapper = mount(Host)
    const formRef = (wrapper.vm as unknown as { formRef: FormExposes }).formRef
    const valid = await formRef.validate()
    expect(valid).toBe(false)
    expect(wrapper.text()).toContain('名称必填')
  })

  it('validate 在填值后返回 true', async () => {
    const Host = defineComponent({
      setup(_, { expose }) {
        const formRef = ref<FormExposes | null>(null)
        const model = reactive<{ name: string }>({ name: 'ok' })
        const rules = { name: [{ required: true, message: '名称必填' }] }
        expose({ formRef })
        return () =>
          h(
            MyForm,
            { ref: formRef, model, rules },
            () => [h(MyFormItem, { prop: 'name' }, () => h('input'))],
          )
      },
    })
    const wrapper = mount(Host)
    const formRef = (wrapper.vm as unknown as { formRef: FormExposes }).formRef
    const valid = await formRef.validate()
    expect(valid).toBe(true)
  })

  it('resetFields 恢复初始值并清除错误', async () => {
    const Host = defineComponent({
      setup(_, { expose }) {
        const formRef = ref<FormExposes | null>(null)
        const model = reactive<{ name: string }>({ name: 'init' })
        const rules = { name: [{ required: true }] }
        expose({ formRef, model })
        return () =>
          h(
            MyForm,
            { ref: formRef, model, rules },
            () => [h(MyFormItem, { prop: 'name' }, () => h('input'))],
          )
      },
    })
    const wrapper = mount(Host)
    const exposes = wrapper.vm as unknown as { formRef: FormExposes; model: { name: string } }
    exposes.model.name = ''
    await exposes.formRef.validate()
    expect(wrapper.text()).toContain('该项必填')

    exposes.formRef.resetFields()
    await wrapper.vm.$nextTick()
    expect(exposes.model.name).toBe('init')
    expect(wrapper.text()).not.toContain('该项必填')
  })

})
