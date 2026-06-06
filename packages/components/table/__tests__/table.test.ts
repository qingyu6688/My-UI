 
import { mount } from '@vue/test-utils'
/* eslint-disable vue/one-component-per-file */
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { MyTable, MyTableColumn, type TableRow } from '..'

const sampleData: TableRow[] = [
  { id: 1, name: '苹果', price: 5 },
  { id: 2, name: '香蕉', price: 3 },
  { id: 3, name: '橙子', price: 6 },
]

function buildHost(propsOverrides: Record<string, unknown> = {}) {
  return defineComponent({
    setup(_, { expose }) {
      const selected = ref<TableRow[]>([])
      expose({ selected })
      return () =>
        h(
          MyTable,
          {
            data: sampleData,
            rowKey: 'id',
            modelValue: selected.value,
            'onUpdate:modelValue': (next: TableRow[]) => {
              selected.value = next
            },
            ...propsOverrides,
          },
          () => [
            h(MyTableColumn, { prop: 'name', label: '名称', sortable: true }),
            h(MyTableColumn, { prop: 'price', label: '价格', sortable: true, align: 'right' }),
          ],
        )
    },
  })
}

describe('MyTable', () => {
  it('渲染列与行', async () => {
    const wrapper = mount(buildHost())
    await nextTick()
    const headers = wrapper.findAll('thead th')
    expect(headers.map((th) => th.text().replace(/\s+/g, '').replace(/▲▼/, ''))).toEqual([
      '名称',
      '价格',
    ])

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(3)
    expect(rows[0].text()).toContain('苹果')
  })

  it('点击表头切换排序', async () => {
    const wrapper = mount(buildHost())
    await nextTick()
    const priceHeader = wrapper.findAll('thead th')[1]
    await priceHeader.trigger('click')
    await nextTick()
    const cells = wrapper.findAll('tbody tr td:nth-child(2)').map((td) => td.text().trim())
    expect(cells).toEqual(['3', '5', '6'])

    await priceHeader.trigger('click')
    await nextTick()
    const desc = wrapper.findAll('tbody tr td:nth-child(2)').map((td) => td.text().trim())
    expect(desc).toEqual(['6', '5', '3'])
  })

  it('空数据时渲染 emptyText', async () => {
    const wrapper = mount(buildHost({ data: [] }))
    await nextTick()
    expect(wrapper.find('.my-table__empty').text()).toBe('暂无数据')
  })

  it('selectable 时全选切换所有行', async () => {
    const wrapper = mount(buildHost({ selectable: true }))
    await nextTick()
    const headerCheckbox = wrapper.find('thead input[type="checkbox"]')
    await headerCheckbox.setValue(true)
    expect((wrapper.vm as unknown as { selected: TableRow[] }).selected).toHaveLength(3)
  })

  it('selectable 时单行勾选', async () => {
    const wrapper = mount(buildHost({ selectable: true }))
    await nextTick()
    const rowCheckbox = wrapper.findAll('tbody input[type="checkbox"]')[0]
    await rowCheckbox.setValue(true)
    const selected = (wrapper.vm as unknown as { selected: TableRow[] }).selected
    expect(selected).toHaveLength(1)
    expect(selected[0].id).toBe(1)
  })
})

function buildFilterHost() {
  return defineComponent({
    setup() {
      return () =>
        h(
          MyTable,
          { data: sampleData, rowKey: 'id' },
          () => [
            h(MyTableColumn, { prop: 'name', label: '名称' }),
            h(MyTableColumn, {
              prop: 'name',
              label: '筛选名称',
              filters: [
                { text: '苹果', value: '苹果' },
                { text: '香蕉', value: '香蕉' },
              ],
            }),
          ],
        )
    },
  })
}

describe('MyTable 筛选', () => {
  afterEach(() => {
    document.querySelectorAll('.my-table__filter-panel').forEach((node) => {
      node.closest('body > *')?.remove()
    })
    document.body.innerHTML = ''
  })

  it('点击筛选图标弹出面板', async () => {
    const wrapper = mount(buildFilterHost(), { attachTo: document.body })
    await nextTick()
    const trigger = wrapper.find('.my-table__filter-trigger')
    expect(trigger.exists()).toBe(true)
    await trigger.trigger('click')
    await nextTick()
    await nextTick()
    // body 中可能存在多个 teleport 面板，取当前可见的那个
    const panels = [...document.querySelectorAll('.my-table__filter-panel')] as HTMLElement[]
    const visiblePanel = panels.find((panel) => panel.style.display !== 'none')
    expect(visiblePanel).toBeTruthy()
    expect(document.querySelectorAll('.my-table__filter-option').length).toBe(2)
    wrapper.unmount()
  })

  it('选择筛选项并确定后过滤数据', async () => {
    const wrapper = mount(buildFilterHost(), { attachTo: document.body })
    await nextTick()
    await wrapper.find('.my-table__filter-trigger').trigger('click')
    await nextTick()
    const options = document.querySelectorAll('.my-table__filter-option')
    ;(options[0] as HTMLElement).click()
    await nextTick()
    ;(document.querySelector('.my-table__filter-btn.is-primary') as HTMLElement).click()
    await nextTick()
    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(1)
    expect(rows[0].text()).toContain('苹果')
    wrapper.unmount()
  })
})

function buildFixedHost() {
  return defineComponent({
    setup() {
      return () =>
        h(
          MyTable,
          { data: sampleData, rowKey: 'id' },
          () => [
            h(MyTableColumn, { prop: 'id', label: 'ID', width: 80, fixed: 'left' }),
            h(MyTableColumn, { prop: 'name', label: '名称' }),
            h(MyTableColumn, { prop: 'price', label: '价格', width: 100, fixed: 'right' }),
          ],
        )
    },
  })
}

describe('MyTable 固定列', () => {
  it('固定列添加 sticky 定位与对应类', async () => {
    const wrapper = mount(buildFixedHost())
    await nextTick()
    expect(wrapper.classes()).toContain('has-fixed-left')
    expect(wrapper.classes()).toContain('has-fixed-right')

    const leftCell = wrapper.find('tbody tr td.is-fixed-left')
    expect(leftCell.exists()).toBe(true)
    expect(leftCell.attributes('style')).toContain('left: 0px')

    const rightCell = wrapper.find('tbody tr td.is-fixed-right')
    expect(rightCell.exists()).toBe(true)
    expect(rightCell.attributes('style')).toContain('right: 0px')
  })
})
