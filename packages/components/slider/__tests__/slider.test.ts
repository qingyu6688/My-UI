import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MySlider } from '..'

describe('MySlider', () => {
  it('按 percentage 定位填充', () => {
    const wrapper = mount(MySlider, { props: { modelValue: 30, min: 0, max: 100 } })
    expect(wrapper.find('.my-slider__fill').attributes('style')).toContain('width: 30%')
  })

  it('键盘右键步进', async () => {
    const wrapper = mount(MySlider, { props: { modelValue: 50, step: 5 } })
    await wrapper.find('.my-slider__thumb').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([55])
  })

  it('禁用时键盘无效', async () => {
    const wrapper = mount(MySlider, { props: { modelValue: 50, disabled: true } })
    await wrapper.find('.my-slider__thumb').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
