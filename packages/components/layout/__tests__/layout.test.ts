import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { MyCol, MyRow } from '..'

describe('MyRow / MyCol', () => {
  it('Col 按 span 添加宽度类', () => {
    const wrapper = mount(MyCol, { props: { span: 12 } })
    expect(wrapper.classes()).toContain('my-col-12')
  })

  it('Col offset 生成偏移类', () => {
    const wrapper = mount(MyCol, { props: { span: 6, offset: 2 } })
    expect(wrapper.classes()).toContain('my-col-offset-2')
  })

  it('Row gutter 透传内边距到 Col', () => {
    const wrapper = mount(MyRow, {
      props: { gutter: 16 },
      slots: { default: () => [h(MyCol, { span: 12 }, () => 'a')] },
    })
    const col = wrapper.findComponent(MyCol)
    expect(col.attributes('style')).toContain('padding-left: 8px')
  })
})
