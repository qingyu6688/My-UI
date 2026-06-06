import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { usePopper } from '../index'

const Host = defineComponent({
  setup(_, { expose }) {
    const popper = usePopper({ placement: 'bottom' })
    expose(popper)
    return () =>
      h('div', [
        h('button', { ref: popper.triggerRef, onClick: popper.toggle }, '触发'),
        popper.visible.value
          ? h('div', { ref: popper.popperRef, class: 'popper' }, '内容')
          : null,
      ])
  },
})

describe('usePopper', () => {
  it('toggle 切换 visible', async () => {
    const wrapper = mount(Host, { attachTo: document.body })
    const vm = wrapper.vm as unknown as { visible: boolean; toggle: () => void }
    expect(vm.visible).toBe(false)
    vm.toggle()
    await wrapper.vm.$nextTick()
    expect(vm.visible).toBe(true)
    wrapper.unmount()
  })

  it('Escape 关闭', async () => {
    const wrapper = mount(Host, { attachTo: document.body })
    const vm = wrapper.vm as unknown as { visible: boolean; open: () => void }
    vm.open()
    await wrapper.vm.$nextTick()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(vm.visible).toBe(false)
    wrapper.unmount()
  })

  it('外部点击关闭', async () => {
    const wrapper = mount(Host, { attachTo: document.body })
    const vm = wrapper.vm as unknown as { visible: boolean; open: () => void }
    vm.open()
    await wrapper.vm.$nextTick()
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(vm.visible).toBe(false)
    wrapper.unmount()
  })
})
