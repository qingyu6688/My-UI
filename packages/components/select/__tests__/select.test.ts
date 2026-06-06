import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { MyOption, MySelect, type SelectValue } from '..'

function buildSelect(initial: SelectValue | SelectValue[] | undefined, multiple = false) {
  return defineComponent({
    setup(_, { expose }) {
      const value = ref<SelectValue | SelectValue[] | undefined>(initial)
      expose({ value })
      return () =>
        h(
          MySelect,
          {
            modelValue: value.value,
            multiple,
            'onUpdate:modelValue': (next: SelectValue | SelectValue[]) => {
              value.value = next
            },
          },
          () => [
            h(MyOption, { value: 'a', label: '苹果' }, () => '苹果'),
            h(MyOption, { value: 'b', label: '香蕉' }, () => '香蕉'),
            h(MyOption, { value: 'c', label: '橙子', disabled: true }, () => '橙子'),
          ],
        )
    },
  })
}

describe('MySelect', () => {
  it('点击触发器后 aria-expanded 变为 true', async () => {
    const wrapper = mount(buildSelect(undefined), { attachTo: document.body })
    const trigger = wrapper.find('.my-select__trigger')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    await trigger.trigger('click')
    expect(trigger.attributes('aria-expanded')).toBe('true')
    wrapper.unmount()
  })

  it('单选时点击选项更新值并关闭', async () => {
    const Host = buildSelect(undefined)
    const wrapper = mount(Host, { attachTo: document.body })
    await wrapper.find('.my-select__trigger').trigger('click')
    const items = document.querySelectorAll('.my-select__option')
    ;(items[1] as HTMLElement).click()
    await nextTick()
    expect((wrapper.vm as unknown as { value: string }).value).toBe('b')
    expect(wrapper.find('.my-select__trigger').attributes('aria-expanded')).toBe('false')
    wrapper.unmount()
  })

  it('多选时累积选项', async () => {
    const Host = buildSelect([], true)
    const wrapper = mount(Host, { attachTo: document.body })
    await wrapper.find('.my-select__trigger').trigger('click')
    const items = document.querySelectorAll('.my-select__option')
    ;(items[0] as HTMLElement).click()
    await nextTick()
    ;(items[1] as HTMLElement).click()
    await nextTick()
    expect((wrapper.vm as unknown as { value: string[] }).value).toEqual(['a', 'b'])
    wrapper.unmount()
  })

  it('禁用选项不可点击', async () => {
    const Host = buildSelect(undefined)
    const wrapper = mount(Host, { attachTo: document.body })
    await wrapper.find('.my-select__trigger').trigger('click')
    const items = document.querySelectorAll('.my-select__option')
    ;(items[2] as HTMLElement).click()
    await nextTick()
    expect((wrapper.vm as unknown as { value: string | undefined }).value).toBeUndefined()
    wrapper.unmount()
  })

  it('键盘 ArrowDown + Enter 选中', async () => {
    const Host = buildSelect(undefined)
    const wrapper = mount(Host, { attachTo: document.body })
    const trigger = wrapper.find('.my-select__trigger')
    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await trigger.trigger('keydown', { key: 'Enter' })
    await nextTick()
    expect((wrapper.vm as unknown as { value: string }).value).toBe('b')
    wrapper.unmount()
  })
})
