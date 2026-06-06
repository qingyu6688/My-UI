import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { MyDropdown, MyDropdownItem } from '..'

function buildHost(props: Record<string, unknown> = {}) {
  return defineComponent({
    setup(_, { expose }) {
      const received: Array<string | number> = []
      expose({ received })
      return () =>
        h(
          MyDropdown,
          { trigger: 'click', ...props, onCommand: (c: string | number) => received.push(c) },
          {
            default: () => h('button', '菜单'),
            dropdown: () => [
              h(MyDropdownItem, { command: 'a' }, () => '选项 A'),
              h(MyDropdownItem, { command: 'b' }, () => '选项 B'),
              h(MyDropdownItem, { command: 'c', disabled: true }, () => '禁用项'),
            ],
          },
        )
    },
  })
}

describe('MyDropdown', () => {
  it('点击触发器展开菜单', async () => {
    const wrapper = mount(buildHost(), { attachTo: document.body })
    await wrapper.find('.my-dropdown__trigger').trigger('click')
    await nextTick()
    const menus = [...document.querySelectorAll('.my-dropdown__menu')] as HTMLElement[]
    const visible = menus.find((m) => m.style.display !== 'none')
    expect(visible?.querySelectorAll('.my-dropdown-item').length).toBe(3)
    wrapper.unmount()
  })

  it('点击菜单项触发 command', async () => {
    const wrapper = mount(buildHost(), { attachTo: document.body })
    await wrapper.find('.my-dropdown__trigger').trigger('click')
    await nextTick()
    const menus = [...document.querySelectorAll('.my-dropdown__menu')] as HTMLElement[]
    const visible = menus.find((m) => m.style.display !== 'none') as HTMLElement
    ;(visible.querySelectorAll('.my-dropdown-item')[1] as HTMLElement).click()
    await nextTick()
    expect((wrapper.vm as unknown as { received: string[] }).received).toEqual(['b'])
    wrapper.unmount()
  })

  it('禁用项不触发 command', async () => {
    const wrapper = mount(buildHost(), { attachTo: document.body })
    await wrapper.find('.my-dropdown__trigger').trigger('click')
    await nextTick()
    const menus = [...document.querySelectorAll('.my-dropdown__menu')] as HTMLElement[]
    const visible = menus.find((m) => m.style.display !== 'none') as HTMLElement
    ;(visible.querySelectorAll('.my-dropdown-item')[2] as HTMLElement).click()
    await nextTick()
    expect((wrapper.vm as unknown as { received: string[] }).received).toEqual([])
    wrapper.unmount()
  })
})
