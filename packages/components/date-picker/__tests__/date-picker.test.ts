import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyDatePicker } from '..'

describe('MyDatePicker', () => {
  it('显示已选日期', () => {
    const wrapper = mount(MyDatePicker, { props: { modelValue: '2026-06-06' } })
    expect(wrapper.find('.my-date-picker__value').text()).toBe('2026-06-06')
    wrapper.unmount()
  })

  it('未选时显示 placeholder', () => {
    const wrapper = mount(MyDatePicker, { props: { placeholder: '请选日期' } })
    expect(wrapper.find('.my-date-picker__placeholder').text()).toBe('请选日期')
    wrapper.unmount()
  })

  it('点击日期单元格触发 change', async () => {
    const wrapper = mount(MyDatePicker, { props: { modelValue: '2026-06-06' }, attachTo: document.body })
    await wrapper.find('.my-date-picker__trigger').trigger('click')
    await wrapper.vm.$nextTick()
    const panel = [...document.querySelectorAll('.my-date-picker__panel')].find(
      (el) => (el as HTMLElement).style.display !== 'none',
    ) as HTMLElement
    const cells = panel.querySelectorAll('.my-date-picker__cell:not(.is-other-month)')
    ;(cells[0] as HTMLElement).click()
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('change')?.[0]?.[0]).toMatch(/^2026-06-/)
    wrapper.unmount()
  })
})
