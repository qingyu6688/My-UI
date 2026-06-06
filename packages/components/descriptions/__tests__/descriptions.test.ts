import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { MyDescriptions, MyDescriptionsItem } from '..'

const Host = defineComponent({
  setup() {
    return () =>
      h(MyDescriptions, { title: '用户信息', column: 2 }, () => [
        h(MyDescriptionsItem, { label: '姓名' }, () => '张三'),
        h(MyDescriptionsItem, { label: '城市' }, () => '北京'),
      ])
  },
})

describe('MyDescriptions', () => {
  it('渲染标题与条目', () => {
    const wrapper = mount(Host)
    expect(wrapper.find('.my-descriptions__title').text()).toBe('用户信息')
    const labels = wrapper.findAll('.my-descriptions__label').map((el) => el.text())
    expect(labels).toContain('姓名')
    expect(wrapper.text()).toContain('张三')
  })

  it('border 添加类', () => {
    const wrapper = mount(MyDescriptions, { props: { border: true } })
    expect(wrapper.classes()).toContain('is-bordered')
  })
})
