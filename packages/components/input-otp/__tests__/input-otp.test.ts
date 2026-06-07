import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyInputOtp } from '..'

describe('MyInputOtp', () => {
  it('按 length 渲染单元格', () => {
    const wrapper = mount(MyInputOtp, { props: { length: 4 } })
    expect(wrapper.findAll('.my-input-otp__cell')).toHaveLength(4)
  })

  it('输入字符更新值', async () => {
    const wrapper = mount(MyInputOtp, { props: { modelValue: '', length: 4 } })
    const cells = wrapper.findAll('input')
    await cells[0].setValue('1')
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('1')
  })

  it('填满触发 complete', async () => {
    const wrapper = mount(MyInputOtp, { props: { modelValue: '12', length: 3 } })
    const cells = wrapper.findAll('input')
    await cells[2].setValue('3')
    expect(wrapper.emitted('complete')?.[0]?.[0]).toBe('123')
  })
})
