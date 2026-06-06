 
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { MyMenu, MyMenuItem, MySubMenu } from '..'

function buildHost(active: string) {
  return defineComponent({
    setup(_, { expose }) {
      const value = ref(active)
      expose({ value })
      return () =>
        h(
          MyMenu,
          {
            modelValue: value.value,
            'onUpdate:modelValue': (next: string) => {
              value.value = next
            },
          },
          () => [
            h(MyMenuItem, { index: '1' }, () => '首页'),
            h(
              MySubMenu,
              { index: '2', title: '设置' },
              () => [
                h(MyMenuItem, { index: '2-1' }, () => '账户'),
                h(MyMenuItem, { index: '2-2' }, () => '安全'),
              ],
            ),
          ],
        )
    },
  })
}

describe('MyMenu', () => {
  it('当前项高亮', () => {
    const wrapper = mount(buildHost('1'))
    const items = wrapper.findAllComponents(MyMenuItem)
    expect(items[0].classes()).toContain('is-active')
  })

  it('点击 item 切换 modelValue', async () => {
    const wrapper = mount(buildHost('1'))
    const items = wrapper.findAllComponents(MyMenuItem)
    await items[0].trigger('click')
    expect((wrapper.vm as unknown as { value: string }).value).toBe('1')
  })

  it('SubMenu 默认折叠，点击标题展开', async () => {
    const wrapper = mount(buildHost('1'))
    const submenu = wrapper.findComponent(MySubMenu)
    expect(submenu.classes()).not.toContain('is-open')
    await submenu.find('.my-sub-menu__title').trigger('click')
    expect(submenu.classes()).toContain('is-open')
  })

  it('SubMenu 展开后子项可点击', async () => {
    const wrapper = mount(buildHost('1'))
    const submenu = wrapper.findComponent(MySubMenu)
    await submenu.find('.my-sub-menu__title').trigger('click')
    const subItems = submenu.findAll('.my-menu-item')
    await subItems[0].trigger('click')
    expect((wrapper.vm as unknown as { value: string }).value).toBe('2-1')
  })
})
