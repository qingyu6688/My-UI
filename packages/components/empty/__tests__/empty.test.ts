import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyEmpty } from '..'

describe('MyEmpty', () => {
  it('默认描述文案', () => {
    const wrapper = mount(MyEmpty)
    expect(wrapper.find('.my-empty__description').text()).toBe('暂无数据')
  })

  it('自定义描述', () => {
    const wrapper = mount(MyEmpty, { props: { description: '空空如也' } })
    expect(wrapper.find('.my-empty__description').text()).toBe('空空如也')
  })

  it('默认插槽作为操作区', () => {
    const wrapper = mount(MyEmpty, { slots: { default: '<button>刷新</button>' } })
    expect(wrapper.find('.my-empty__actions').exists()).toBe(true)
  })
})
