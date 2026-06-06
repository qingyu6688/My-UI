import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { MyTooltip } from '..'

describe('MyTooltip', () => {
  it('hover 触发显示', async () => {
    const wrapper = mount(MyTooltip, {
      props: { content: '提示' },
      slots: { default: '<button>悬停</button>' },
      attachTo: document.body,
    })
    await wrapper.find('.my-tooltip__trigger').trigger('mouseenter')
    await nextTick()
    expect(document.querySelector('.my-tooltip')?.getAttribute('style')).not.toContain('display: none')
    wrapper.unmount()
  })

  it('disabled 不触发显示', async () => {
    const wrapper = mount(MyTooltip, {
      props: { content: '提示', disabled: true },
      slots: { default: '<button>悬停</button>' },
      attachTo: document.body,
    })
    await wrapper.find('.my-tooltip__trigger').trigger('mouseenter')
    await nextTick()
    const tooltip = document.querySelector('.my-tooltip') as HTMLElement | null
    expect(tooltip?.style.display).toBe('none')
    wrapper.unmount()
  })

  it('click 触发模式 toggle 显示', async () => {
    const wrapper = mount(MyTooltip, {
      props: { content: '提示', trigger: 'click' },
      slots: { default: '<button>点击</button>' },
      attachTo: document.body,
    })
    const trigger = wrapper.find('.my-tooltip__trigger')
    await trigger.trigger('click')
    await nextTick()
    const tooltip = document.querySelector('.my-tooltip') as HTMLElement | null
    expect(tooltip?.style.display).not.toBe('none')
    wrapper.unmount()
  })

  it('emit visibleChange', async () => {
    const wrapper = mount(MyTooltip, {
      props: { content: '提示' },
      slots: { default: '<button>悬停</button>' },
      attachTo: document.body,
    })
    await wrapper.find('.my-tooltip__trigger').trigger('mouseenter')
    await nextTick()
    expect(wrapper.emitted('visibleChange')?.[0]).toEqual([true])
    wrapper.unmount()
  })
})
