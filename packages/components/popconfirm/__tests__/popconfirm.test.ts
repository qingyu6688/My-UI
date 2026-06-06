import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { MyPopconfirm } from '..'

describe('MyPopconfirm', () => {
  it('点击触发器弹出确认框', async () => {
    const wrapper = mount(MyPopconfirm, {
      props: { title: '确认删除？' },
      slots: { default: '<button>删除</button>' },
      attachTo: document.body,
    })
    await wrapper.find('.my-popconfirm__trigger').trigger('click')
    await nextTick()
    const panels = [...document.querySelectorAll('.my-popconfirm')] as HTMLElement[]
    const visible = panels.find((p) => p.style.display !== 'none')
    expect(visible?.querySelector('.my-popconfirm__title')?.textContent).toContain('确认删除？')
    wrapper.unmount()
  })

  it('点击确定触发 confirm', async () => {
    const wrapper = mount(MyPopconfirm, {
      slots: { default: '<button>删除</button>' },
      attachTo: document.body,
    })
    await wrapper.find('.my-popconfirm__trigger').trigger('click')
    await nextTick()
    const panels = [...document.querySelectorAll('.my-popconfirm')] as HTMLElement[]
    const visible = panels.find((p) => p.style.display !== 'none') as HTMLElement
    ;(visible.querySelectorAll('.my-button')[1] as HTMLElement).click()
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    wrapper.unmount()
  })

  it('点击取消触发 cancel', async () => {
    const wrapper = mount(MyPopconfirm, {
      slots: { default: '<button>删除</button>' },
      attachTo: document.body,
    })
    await wrapper.find('.my-popconfirm__trigger').trigger('click')
    await nextTick()
    const panels = [...document.querySelectorAll('.my-popconfirm')] as HTMLElement[]
    const visible = panels.find((p) => p.style.display !== 'none') as HTMLElement
    ;(visible.querySelectorAll('.my-button')[0] as HTMLElement).click()
    expect(wrapper.emitted('cancel')).toHaveLength(1)
    wrapper.unmount()
  })
})
