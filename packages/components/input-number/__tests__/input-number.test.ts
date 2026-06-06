import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyInputNumber } from '..'

describe('MyInputNumber', () => {
  it('点击 + 触发递增', async () => {
    const wrapper = mount(MyInputNumber, { props: { modelValue: 1, step: 2 } })
    await wrapper.find('[aria-label="增加"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])
  })

  it('达到最大值时禁用 +', async () => {
    const wrapper = mount(MyInputNumber, { props: { modelValue: 10, max: 10 } })
    const incBtn = wrapper.find('[aria-label="增加"]')
    expect(incBtn.attributes('disabled')).toBeDefined()
  })

  it('键盘 ArrowDown 触发递减', async () => {
    const wrapper = mount(MyInputNumber, { props: { modelValue: 5 } })
    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])
  })

  it('blur 时空值提交为 null', async () => {
    const wrapper = mount(MyInputNumber, { props: { modelValue: 3 } })
    const input = wrapper.find('input')
    await input.setValue('')
    await input.trigger('blur')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([null])
  })

  it('blur 时超出范围则被夹到边界', async () => {
    const wrapper = mount(MyInputNumber, { props: { modelValue: 1, min: 0, max: 5 } })
    const input = wrapper.find('input')
    await input.setValue('99')
    await input.trigger('blur')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([5])
  })

  it('precision 控制提交值精度', async () => {
    const wrapper = mount(MyInputNumber, {
      props: { modelValue: 1, step: 0.1, precision: 2 },
    })
    await wrapper.find('[aria-label="增加"]').trigger('click')
    const value = wrapper.emitted('update:modelValue')?.[0]?.[0]
    expect(value).toBeCloseTo(1.1)
  })
})
