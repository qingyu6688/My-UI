 
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { MyTabPane, MyTabs, type TabsName } from '..'

function buildHost(initial: string) {
  return defineComponent({
    setup(_, { expose }) {
      const value = ref(initial)
      expose({ value })
      return () =>
        h(
          MyTabs,
          {
            modelValue: value.value,
            closable: true,
            'onUpdate:modelValue': (next: TabsName) => {
              value.value = String(next)
            },
            onTabRemove: (name: TabsName) => {
              if (value.value === String(name)) value.value = 'a'
            },
          },
          () => [
            h(MyTabPane, { name: 'a', label: '一' }, () => '一内容'),
            h(MyTabPane, { name: 'b', label: '二' }, () => '二内容'),
            h(MyTabPane, { name: 'c', label: '三', disabled: true }, () => '三内容'),
          ],
        )
    },
  })
}

describe('MyTabs', () => {
  it('默认渲染初始 active 与内容', async () => {
    const wrapper = mount(buildHost('a'))
    await nextTick()
    const items = wrapper.findAll('.my-tabs__item')
    expect(items).toHaveLength(3)
    expect(items[0].classes()).toContain('is-active')
    expect(wrapper.text()).toContain('一内容')
  })

  it('点击切换 active tab', async () => {
    const wrapper = mount(buildHost('a'))
    await nextTick()
    const items = wrapper.findAll('.my-tabs__item')
    await items[1].trigger('click')
    expect((wrapper.vm as unknown as { value: string }).value).toBe('b')
  })

  it('disabled tab 点击无效', async () => {
    const wrapper = mount(buildHost('a'))
    await nextTick()
    const items = wrapper.findAll('.my-tabs__item')
    await items[2].trigger('click')
    expect((wrapper.vm as unknown as { value: string }).value).toBe('a')
  })

  it('closable 时关闭按钮触发 tabRemove', async () => {
    const wrapper = mount(buildHost('b'))
    await nextTick()
    const items = wrapper.findAll('.my-tabs__item')
    await items[1].find('.my-tabs__close').trigger('click')
    await nextTick()
    expect((wrapper.vm as unknown as { value: string }).value).toBe('a')
  })
})
