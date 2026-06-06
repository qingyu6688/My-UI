import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { MyTimeline, MyTimelineItem } from '..'

const Host = defineComponent({
  setup() {
    return () =>
      h(MyTimeline, () => [
        h(MyTimelineItem, { timestamp: '2026-01-01', type: 'success' }, () => '创建'),
        h(MyTimelineItem, { timestamp: '2026-01-02' }, () => '完成'),
      ])
  },
})

describe('MyTimeline', () => {
  it('渲染节点与时间戳', () => {
    const wrapper = mount(Host)
    expect(wrapper.findAll('.my-timeline-item')).toHaveLength(2)
    expect(wrapper.text()).toContain('2026-01-01')
    expect(wrapper.find('.my-timeline-item__node--success').exists()).toBe(true)
  })

  it('hollow 节点添加类', () => {
    const wrapper = mount(MyTimelineItem, { props: { hollow: true } })
    expect(wrapper.find('.my-timeline-item__node').classes()).toContain('is-hollow')
  })
})
