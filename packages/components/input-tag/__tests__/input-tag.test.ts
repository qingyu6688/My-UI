import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyInputTag } from '..'

describe('MyInputTag', () => {
  it('渲染已有标签', () => {
    const wrapper = mount(MyInputTag, { props: { modelValue: ['a', 'b'] } })
    expect(wrapper.findAll('.my-input-tag__tag')).toHaveLength(2)
  })

  it('回车新增标签', async () => {
    const wrapper = mount(MyInputTag, { props: { modelValue: [] } })
    const input = wrapper.find('input')
    await input.setValue('new')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['new']])
  })

  it('点击关闭移除标签', async () => {
    const wrapper = mount(MyInputTag, { props: { modelValue: ['a', 'b'] } })
    await wrapper.findAll('.my-input-tag__close')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['b']])
  })

  it('达到 max 不再新增', async () => {
    const wrapper = mount(MyInputTag, { props: { modelValue: ['a'], max: 1 } })
    const input = wrapper.find('input')
    await input.setValue('b')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
