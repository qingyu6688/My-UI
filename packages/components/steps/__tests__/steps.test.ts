/* eslint-disable vue/one-component-per-file */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { MyStep, MySteps } from '..'

function buildHost(active = 1) {
  return defineComponent({
    setup() {
      return () =>
        h(MySteps, { active }, () => [
          h(MyStep, { title: '第一步' }),
          h(MyStep, { title: '第二步' }),
          h(MyStep, { title: '第三步' }),
        ])
    },
  })
}

describe('MySteps', () => {
  it('渲染所有步骤', async () => {
    const wrapper = mount(buildHost())
    await nextTick()
    expect(wrapper.findAllComponents(MyStep)).toHaveLength(3)
  })

  it('按 active 计算状态', async () => {
    const wrapper = mount(buildHost(1))
    await nextTick()
    const steps = wrapper.findAllComponents(MyStep)
    expect(steps[0].classes()).toContain('is-finish')
    expect(steps[1].classes()).toContain('is-process')
    expect(steps[2].classes()).toContain('is-wait')
  })

  it('显式 status 覆盖自动状态', async () => {
    const Host = defineComponent({
      setup() {
        return () =>
          h(MySteps, { active: 0 }, () => [
            h(MyStep, { title: 'A', status: 'error' }),
            h(MyStep, { title: 'B' }),
          ])
      },
    })
    const wrapper = mount(Host)
    await nextTick()
    expect(wrapper.findAllComponents(MyStep)[0].classes()).toContain('is-error')
  })

  it('vertical 方向类', async () => {
    const Host = defineComponent({
      setup() {
        return () => h(MySteps, { active: 0, direction: 'vertical' }, () => [h(MyStep, { title: 'A' })])
      },
    })
    const wrapper = mount(Host)
    await nextTick()
    expect(wrapper.find('.my-steps').classes()).toContain('my-steps--vertical')
  })
})
