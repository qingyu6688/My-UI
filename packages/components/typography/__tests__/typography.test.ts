import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MyParagraph, MyTitle } from '..'

describe('Typography', () => {
  it('Title 按 level 渲染对应标签', () => {
    const wrapper = mount(MyTitle, { props: { level: 2 }, slots: { default: '标题' } })
    expect(wrapper.find('h2').exists()).toBe(true)
    expect(wrapper.text()).toBe('标题')
  })

  it('Paragraph 渲染段落与间距类', () => {
    const wrapper = mount(MyParagraph, { props: { spacing: 'relaxed' }, slots: { default: '正文' } })
    expect(wrapper.find('p.my-paragraph--relaxed').exists()).toBe(true)
  })
})
