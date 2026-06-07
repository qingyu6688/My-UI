import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyTransfer, type TransferItem } from '..'

const data: TransferItem[] = [
  { key: 1, label: '选项 1' },
  { key: 2, label: '选项 2' },
  { key: 3, label: '选项 3' },
]

describe('MyTransfer', () => {
  it('左侧渲染未选项', () => {
    const wrapper = mount(MyTransfer, { props: { data, modelValue: [2] } })
    // 左侧应有 2 项（1、3），右侧 1 项（2）
    const lists = wrapper.findAll('.my-transfer__list')
    expect(lists[0].findAll('.my-transfer__item')).toHaveLength(2)
    expect(lists[1].findAll('.my-transfer__item')).toHaveLength(1)
  })

  it('勾选并右移更新 modelValue', async () => {
    const wrapper = mount(MyTransfer, { props: { data, modelValue: [] } })
    const leftItems = wrapper.findAll('.my-transfer__list')[0].findAll('.my-transfer__item')
    await leftItems[0].trigger('click')
    await wrapper.findAll('.my-transfer__actions button')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[1]])
  })
})
