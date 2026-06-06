import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { MyDialog } from '..'

describe('MyDialog', () => {
  it('modelValue 控制显示', async () => {
    const wrapper = mount(MyDialog, {
      props: { modelValue: true, title: '标题' },
      slots: { default: '内容' },
      attachTo: document.body,
    })
    await nextTick()
    const dialog = document.querySelector('.my-dialog') as HTMLElement | null
    expect(dialog?.style.display).not.toBe('none')
    expect(document.querySelector('.my-dialog__title')?.textContent).toBe('标题')
    wrapper.unmount()
  })

  it('点击关闭按钮 emit update:modelValue false', async () => {
    const wrapper = mount(MyDialog, {
      props: { modelValue: true },
      attachTo: document.body,
    })
    await nextTick()
    ;(document.querySelector('.my-dialog__close') as HTMLElement).click()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('beforeClose 拦截关闭', async () => {
    const beforeClose = vi.fn()
    const wrapper = mount(MyDialog, {
      props: { modelValue: true, beforeClose },
      attachTo: document.body,
    })
    await nextTick()
    ;(document.querySelector('.my-dialog__close') as HTMLElement).click()
    expect(beforeClose).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it('Escape 关闭', async () => {
    const wrapper = mount(MyDialog, {
      props: { modelValue: true },
      attachTo: document.body,
    })
    await nextTick()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it('footer slot 渲染', async () => {
    const wrapper = mount(MyDialog, {
      props: { modelValue: true },
      slots: { footer: '<button class="ok">确定</button>' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.querySelector('.my-dialog__footer .ok')).toBeTruthy()
    wrapper.unmount()
  })
})
