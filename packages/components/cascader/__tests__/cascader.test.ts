import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyCascader, type CascaderOption } from '..'

const options: CascaderOption[] = [
  {
    label: '浙江',
    value: 'zj',
    children: [
      { label: '杭州', value: 'hz' },
      { label: '宁波', value: 'nb' },
    ],
  },
  { label: '北京', value: 'bj' },
]

function visiblePanel(): HTMLElement | undefined {
  return [...document.querySelectorAll('.my-cascader__panel')].find(
    (panel) => (panel as HTMLElement).style.display !== 'none',
  ) as HTMLElement | undefined
}

describe('MyCascader', () => {
  it('回显已选路径标签', () => {
    const wrapper = mount(MyCascader, { props: { options, modelValue: ['zj', 'hz'] } })
    expect(wrapper.find('.my-cascader__value').text()).toContain('浙江')
    expect(wrapper.find('.my-cascader__value').text()).toContain('杭州')
    wrapper.unmount()
  })

  it('叶子节点选择触发 change', async () => {
    const wrapper = mount(MyCascader, { props: { options, modelValue: [] }, attachTo: document.body })
    await wrapper.find('.my-cascader__trigger').trigger('click')
    await wrapper.vm.$nextTick()

    const panel = visiblePanel()
    const firstCol = panel!.querySelectorAll('.my-cascader__column')[0]
    ;(firstCol.querySelectorAll('.my-cascader__option')[0] as HTMLElement).click()
    await wrapper.vm.$nextTick()

    const cols = panel!.querySelectorAll('.my-cascader__column')
    ;(cols[1].querySelectorAll('.my-cascader__option')[0] as HTMLElement).click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('change')?.at(-1)?.[0]).toEqual(['zj', 'hz'])
    wrapper.unmount()
  })
})
