import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MySegmented } from '..'

describe('MySegmented', () => {
  it('渲染选项并标记选中', () => {
    const wrapper = mount(MySegmented, {
      props: { modelValue: 'b', options: ['a', 'b', 'c'] },
    })
    const items = wrapper.findAll('.my-segmented__item')
    expect(items).toHaveLength(3)
    expect(items[1].classes()).toContain('is-active')
  })

  it('点击触发更新', async () => {
    const wrapper = mount(MySegmented, {
      props: { modelValue: 'a', options: ['a', 'b'] },
    })
    await wrapper.findAll('.my-segmented__item')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b'])
  })

  it('对象选项支持 disabled', async () => {
    const wrapper = mount(MySegmented, {
      props: {
        modelValue: 'a',
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b', disabled: true },
        ],
      },
    })
    await wrapper.findAll('.my-segmented__item')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
