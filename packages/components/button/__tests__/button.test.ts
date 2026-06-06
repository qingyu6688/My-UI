import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyButton } from '..'

describe('MyButton', () => {
  it('渲染默认内容', () => {
    const wrapper = mount(MyButton, {
      slots: {
        default: '保存',
      },
    })

    expect(wrapper.text()).toBe('保存')
    expect(wrapper.classes()).toContain('my-button--default')
  })

  it('触发点击事件', async () => {
    const wrapper = mount(MyButton)

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('禁用时不触发点击事件', async () => {
    const wrapper = mount(MyButton, {
      props: {
        disabled: true,
      },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeUndefined()
  })
})

