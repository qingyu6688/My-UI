import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { createLoading, vLoading } from '..'

describe('Loading 服务', () => {
  it('createLoading 全屏挂载并可关闭', () => {
    const instance = createLoading({ fullscreen: true, text: '加载中' })
    expect(document.querySelector('.my-loading-mask')).toBeTruthy()
    expect(document.querySelector('.my-loading-text')?.textContent).toBe('加载中')
    instance.close()
    expect(document.querySelector('.my-loading-mask')).toBeNull()
  })

  it('setText 更新文案', async () => {
    const instance = createLoading({ fullscreen: true, text: 'A' })
    instance.setText('B')
    await nextTick()
    expect(document.querySelector('.my-loading-text')?.textContent).toBe('B')
    instance.close()
  })
})

describe('v-loading 指令', () => {
  it('值为 true 时显示遮罩，false 时移除', async () => {
    const wrapper = mount(
      {
        props: ['show'],
        template: '<div v-loading="show" style="height:100px">内容</div>',
      },
      {
        props: { show: true },
        global: { directives: { loading: vLoading } },
        attachTo: document.body,
      },
    )
    await nextTick()
    expect(wrapper.element.querySelector('.my-loading-mask')).toBeTruthy()

    await wrapper.setProps({ show: false })
    await nextTick()
    expect(wrapper.element.querySelector('.my-loading-mask')).toBeNull()
    wrapper.unmount()
  })
})
