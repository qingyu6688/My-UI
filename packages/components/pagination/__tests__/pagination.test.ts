import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyPagination } from '..'

describe('MyPagination', () => {
  it('点击页码触发 currentChange', async () => {
    const wrapper = mount(MyPagination, {
      props: { currentPage: 1, pageSize: 10, total: 50 },
    })
    const targetPage = wrapper
      .findAll('.my-pagination__page')
      .find((node) => node.text().trim() === '3')
    await targetPage?.trigger('click')
    expect(wrapper.emitted('update:currentPage')?.[0]).toEqual([3])
  })

  it('上一页在第一页时禁用，下一页在末页时禁用', () => {
    const first = mount(MyPagination, {
      props: { currentPage: 1, pageSize: 10, total: 30 },
    })
    expect(first.find('button[aria-label="上一页"]').attributes('disabled')).toBeDefined()

    const last = mount(MyPagination, {
      props: { currentPage: 3, pageSize: 10, total: 30 },
    })
    expect(last.find('button[aria-label="下一页"]').attributes('disabled')).toBeDefined()
  })

  it('单页时 hideOnSinglePage 不渲染', () => {
    const wrapper = mount(MyPagination, {
      props: { currentPage: 1, pageSize: 10, total: 5, hideOnSinglePage: true },
    })
    expect(wrapper.find('.my-pagination').exists()).toBe(false)
  })

  it('jumper 输入回车切换页', async () => {
    const wrapper = mount(MyPagination, {
      props: { currentPage: 1, pageSize: 10, total: 100, layout: 'jumper' },
    })
    const input = wrapper.find('.my-pagination__jumper-input')
    await input.setValue('5')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted('update:currentPage')?.[0]).toEqual([5])
  })

  it('选择 pageSize 触发 sizeChange', async () => {
    const wrapper = mount(MyPagination, {
      props: {
        currentPage: 1,
        pageSize: 10,
        total: 100,
        layout: 'sizes, prev, pager, next',
      },
    })
    const select = wrapper.find('select')
    await select.setValue('20')
    expect(wrapper.emitted('update:pageSize')?.[0]).toEqual([20])
  })
})
