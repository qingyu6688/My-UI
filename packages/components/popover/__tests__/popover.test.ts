import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { MyPopover } from '..'

describe('MyPopover', () => {
  it('hover 触发显示标题与内容', async () => {
    const wrapper = mount(MyPopover, {
      props: { title: '标题', content: '内容' },
      slots: { default: '<button>触发</button>' },
      attachTo: document.body,
    })
    await wrapper.find('.my-popover__trigger').trigger('mouseenter')
    await nextTick()
    const panels = [...document.querySelectorAll('.my-popover')] as HTMLElement[]
    const visible = panels.find((p) => p.style.display !== 'none')
    expect(visible).toBeTruthy()
    expect(visible?.querySelector('.my-popover__title')?.textContent).toBe('标题')
    wrapper.unmount()
  })

  it('click 触发 toggle', async () => {
    const wrapper = mount(MyPopover, {
      props: { content: '内容', trigger: 'click' },
      slots: { default: '<button>触发</button>' },
      attachTo: document.body,
    })
    await wrapper.find('.my-popover__trigger').trigger('click')
    await nextTick()
    expect(wrapper.emitted('visibleChange')?.[0]).toEqual([true])
    wrapper.unmount()
  })

  it('disabled 不触发', async () => {
    const wrapper = mount(MyPopover, {
      props: { content: '内容', disabled: true },
      slots: { default: '<button>触发</button>' },
      attachTo: document.body,
    })
    await wrapper.find('.my-popover__trigger').trigger('mouseenter')
    await nextTick()
    expect(wrapper.emitted('visibleChange')).toBeUndefined()
    wrapper.unmount()
  })
})
