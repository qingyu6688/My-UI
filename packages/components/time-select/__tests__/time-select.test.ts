import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyTimeSelect } from '..'

describe('MyTimeSelect', () => {
  it('按间隔生成选项', async () => {
    const wrapper = mount(MyTimeSelect, {
      props: { start: '09:00', end: '10:00', step: '00:30' },
      attachTo: document.body,
    })
    await wrapper.find('.my-time-select__trigger').trigger('click')
    await wrapper.vm.$nextTick()
    const panel = [...document.querySelectorAll('.my-time-select__panel')].find(
      (el) => (el as HTMLElement).style.display !== 'none',
    ) as HTMLElement
    const options = panel.querySelectorAll('.my-time-select__option')
    expect(options).toHaveLength(3) // 09:00 / 09:30 / 10:00
    wrapper.unmount()
  })

  it('选择时间触发 change', async () => {
    const wrapper = mount(MyTimeSelect, {
      props: { start: '09:00', end: '10:00', step: '00:30' },
      attachTo: document.body,
    })
    await wrapper.find('.my-time-select__trigger').trigger('click')
    await wrapper.vm.$nextTick()
    const panel = [...document.querySelectorAll('.my-time-select__panel')].find(
      (el) => (el as HTMLElement).style.display !== 'none',
    ) as HTMLElement
    ;(panel.querySelectorAll('.my-time-select__option')[1] as HTMLElement).click()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('change')?.[0]).toEqual(['09:30'])
    wrapper.unmount()
  })
})
