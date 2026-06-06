import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { MyCollapse, MyCollapseItem, type CollapseModelValue } from '..'

function buildHost(accordion = false) {
  return defineComponent({
    setup(_, { expose }) {
      const value = ref<string | string[]>(accordion ? '' : [])
      expose({ value })
      return () =>
        h(
          MyCollapse,
          {
            modelValue: value.value,
            accordion,
            'onUpdate:modelValue': (next: CollapseModelValue) =>
              (value.value = next as string | string[]),
          },
          () => [
            h(MyCollapseItem, { name: 'a', title: '一' }, () => '内容一'),
            h(MyCollapseItem, { name: 'b', title: '二' }, () => '内容二'),
          ],
        )
    },
  })
}

describe('MyCollapse', () => {
  it('点击展开项', async () => {
    const wrapper = mount(buildHost())
    await wrapper.findAll('.my-collapse-item__header')[0].trigger('click')
    expect((wrapper.vm as unknown as { value: string[] }).value).toEqual(['a'])
  })

  it('手风琴模式只展开一个', async () => {
    const wrapper = mount(buildHost(true))
    const headers = wrapper.findAll('.my-collapse-item__header')
    await headers[0].trigger('click')
    expect((wrapper.vm as unknown as { value: string }).value).toBe('a')
    await headers[1].trigger('click')
    expect((wrapper.vm as unknown as { value: string }).value).toBe('b')
  })
})
