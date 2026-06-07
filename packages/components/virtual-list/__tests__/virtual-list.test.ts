import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyVirtualList } from '..'

describe('MyVirtualList', () => {
  it('只渲染可视区域的子集', () => {
    const items = Array.from({ length: 1000 }, (_, i) => i)
    const wrapper = mount(MyVirtualList, {
      props: { items, itemHeight: 32, height: 320 },
      slots: { default: '<span class="row" />' },
    })
    const rendered = wrapper.findAll('.my-virtual-list__item')
    // 远小于 1000，证明虚拟化生效
    expect(rendered.length).toBeLessThan(40)
    expect(rendered.length).toBeGreaterThan(0)
  })

  it('phantom 高度为总高', () => {
    const items = Array.from({ length: 100 }, (_, i) => i)
    const wrapper = mount(MyVirtualList, { props: { items, itemHeight: 30 } })
    expect(wrapper.find('.my-virtual-list__phantom').attributes('style')).toContain('height: 3000px')
  })
})
