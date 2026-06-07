import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyTree, type TreeNodeData } from '..'

const data: TreeNodeData[] = [
  {
    key: '1',
    label: '一级 1',
    children: [
      { key: '1-1', label: '二级 1-1' },
      { key: '1-2', label: '二级 1-2' },
    ],
  },
  { key: '2', label: '一级 2' },
]

describe('MyTree', () => {
  it('默认展开全部渲染所有节点', () => {
    const wrapper = mount(MyTree, { props: { data, defaultExpandAll: true } })
    expect(wrapper.findAll('.my-tree-node__label')).toHaveLength(4)
  })

  it('点击箭头展开/收起', async () => {
    const wrapper = mount(MyTree, { props: { data } })
    // 初始未展开，仅两个一级节点
    expect(wrapper.findAll('.my-tree-node__label')).toHaveLength(2)
    await wrapper.findAll('.my-tree-node__arrow')[0].trigger('click')
    expect(wrapper.findAll('.my-tree-node__label').length).toBeGreaterThan(2)
  })

  it('勾选节点连带子节点', async () => {
    const wrapper = mount(MyTree, { props: { data, showCheckbox: true, defaultExpandAll: true } })
    const checkboxes = wrapper.findAll('.my-tree-node__checkbox')
    await checkboxes[0].trigger('click')
    expect(wrapper.emitted('check')).toBeTruthy()
    const last = wrapper.emitted('check')?.at(-1)?.[0] as string[]
    expect(last).toContain('1')
    expect(last).toContain('1-1')
  })
})
