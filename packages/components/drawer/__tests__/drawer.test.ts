import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { MyDrawer } from '..'

describe('MyDrawer', () => {
  it('modelValue 控制显示与标题', async () => {
    const wrapper = mount(MyDrawer, {
      props: { modelValue: true, title: '抽屉' },
      slots: { default: '内容' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.querySelector('.my-drawer__title')?.textContent).toBe('抽屉')
    wrapper.unmount()
  })

  it('方向类正确', async () => {
    const wrapper = mount(MyDrawer, {
      props: { modelValue: true, direction: 'ltr' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.querySelector('.my-drawer--ltr')).toBeTruthy()
    wrapper.unmount()
  })

  it('点击关闭按钮 emit false', async () => {
    const wrapper = mount(MyDrawer, {
      props: { modelValue: true },
      attachTo: document.body,
    })
    await nextTick()
    ;(document.querySelector('.my-drawer__close') as HTMLElement).click()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('beforeClose 拦截', async () => {
    const beforeClose = vi.fn()
    const wrapper = mount(MyDrawer, {
      props: { modelValue: true, beforeClose },
      attachTo: document.body,
    })
    await nextTick()
    ;(document.querySelector('.my-drawer__close') as HTMLElement).click()
    expect(beforeClose).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it('Escape 关闭', async () => {
    const wrapper = mount(MyDrawer, {
      props: { modelValue: true },
      attachTo: document.body,
    })
    await nextTick()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    wrapper.unmount()
  })
})
