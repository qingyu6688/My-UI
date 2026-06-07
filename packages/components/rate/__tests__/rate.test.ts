import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyRate } from '..'

describe('MyRate', () => {
  it('按 modelValue 点亮星星', () => {
    const wrapper = mount(MyRate, { props: { modelValue: 3, max: 5 } })
    expect(wrapper.findAll('.my-rate__item.is-full')).toHaveLength(3)
  })

  it('点击星星触发更新', async () => {
    const wrapper = mount(MyRate, { props: { modelValue: 0 } })
    await wrapper.findAll('.my-rate__item')[2].trigger('mousemove')
    await wrapper.findAll('.my-rate__item')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])
  })

  it('只读时不触发', async () => {
    const wrapper = mount(MyRate, { props: { modelValue: 2, readonly: true } })
    await wrapper.findAll('.my-rate__item')[4].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
