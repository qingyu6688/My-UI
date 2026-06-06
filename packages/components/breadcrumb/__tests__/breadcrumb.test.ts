import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { MyBreadcrumb, MyBreadcrumbItem } from '..'

function buildHost(separator = '/') {
  return defineComponent({
    setup() {
      return () =>
        h(MyBreadcrumb, { separator }, () => [
          h(MyBreadcrumbItem, { to: '/' }, () => '首页'),
          h(MyBreadcrumbItem, { to: '/list' }, () => '列表'),
          h(MyBreadcrumbItem, null, () => '详情'),
        ])
    },
  })
}

describe('MyBreadcrumb', () => {
  it('渲染所有项', () => {
    const wrapper = mount(buildHost())
    expect(wrapper.findAllComponents(MyBreadcrumbItem)).toHaveLength(3)
    expect(wrapper.text()).toContain('首页')
    expect(wrapper.text()).toContain('详情')
  })

  it('有 to 的项渲染为链接', () => {
    const wrapper = mount(buildHost())
    const links = wrapper.findAll('.my-breadcrumb-item__link')
    expect(links).toHaveLength(2)
    expect(links[0].attributes('href')).toBe('/')
  })

  it('最后一项渲染为文本', () => {
    const wrapper = mount(buildHost())
    const items = wrapper.findAllComponents(MyBreadcrumbItem)
    expect(items[2].find('.my-breadcrumb-item__text').exists()).toBe(true)
  })

  it('自定义分隔符透传', () => {
    const wrapper = mount(buildHost('>'))
    expect(wrapper.find('.my-breadcrumb-item__separator').text()).toBe('>')
  })
})
