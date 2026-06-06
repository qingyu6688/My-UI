/* eslint-disable vue/one-component-per-file */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { provideConfig, useConfig, useGlobalSize, useLocale } from '../index'
import { en } from '../../../locale'

const Child = defineComponent({
  setup(_, { expose }) {
    const config = useConfig()
    const size = useGlobalSize()
    const locale = useLocale()
    expose({ config, size, locale })
    return () => h('div', config.value.namespace)
  },
})

describe('useConfig', () => {
  it('无 Provider 时返回默认配置', () => {
    const wrapper = mount(Child)
    // 通过组件实例代理访问时 ref 会自动解包
    const vm = wrapper.vm as unknown as {
      config: { namespace: string; size: string }
      size: string
    }
    expect(vm.config.namespace).toBe('my')
    expect(vm.size).toBe('default')
  })

  it('Provider 提供的配置可被子组件读取', () => {
    const childRef = { value: null as unknown }
    const Parent = defineComponent({
      setup() {
        provideConfig({ namespace: 'ui', size: 'large', locale: en })
        return () => h(Child, { ref: (el) => (childRef.value = el) })
      },
    })
    mount(Parent)
    const vm = childRef.value as { size: string; locale: { name: string } }
    expect(vm.size).toBe('large')
    expect(vm.locale.name).toBe('en')
  })
})
