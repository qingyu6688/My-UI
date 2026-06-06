import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyTag } from '..'

describe('MyTag', () => {
  it('渲染默认 type 与 size', () => {
    const wrapper = mount(MyTag, { slots: { default: '默认' } })
    expect(wrapper.classes()).toContain('my-tag--default')
    expect(wrapper.classes()).toContain('my-tag--default')
    expect(wrapper.text()).toBe('默认')
  })

  it('closable 时点击 close 按钮触发 close 事件', async () => {
    const wrapper = mount(MyTag, { props: { closable: true } })
    await wrapper.find('button[aria-label="关闭标签"]').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('点击标签触发 click', async () => {
    const wrapper = mount(MyTag)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('round 添加 is-round 类', () => {
    const wrapper = mount(MyTag, { props: { round: true } })
    expect(wrapper.classes()).toContain('is-round')
  })

  it('effect 切换样式类', () => {
    const wrapper = mount(MyTag, { props: { effect: 'dark' } })
    expect(wrapper.classes()).toContain('my-tag--dark')
  })
})
