<script setup lang="ts">
import { computed, inject, useSlots, type CSSProperties } from 'vue'
import { useSize } from '../../../hooks/use-config'
import { mixColor } from '../../../utils/color'
import { buttonGroupContextKey, type ButtonEmits, type ButtonProps } from './button'

defineOptions({
  name: 'MyButton',
})

const props = withDefaults(defineProps<ButtonProps>(), {
  type: undefined,
  size: undefined,
  nativeType: 'button',
  disabled: false,
  loading: false,
  plain: false,
  round: false,
  circle: false,
  dashed: false,
  text: false,
  bg: false,
  link: false,
  color: undefined,
  tag: 'button',
  autoInsertSpace: false,
  autofocus: false,
})

const emit = defineEmits<ButtonEmits>()
const slots = useSlots()

// ButtonGroup 透传：组件 prop 优先，未指定时取组配置
const group = inject(buttonGroupContextKey, undefined)
const actualType = computed(() => props.type ?? group?.type.value ?? 'default')
const actualSize = useSize(props, computed(() => group?.size.value))

/**
 * 自定义 color：派生 hover / active / 浅色版本
 * 沿用 mixColor 工具（lightenColor 等价 mixWith #fff、darkenColor 等价 mixWith #000）。
 */
const colorVars = computed<CSSProperties>(() => {
  if (!props.color) return {}
  return {
    '--my-button-bg-color': props.color,
    '--my-button-border-color': props.color,
    '--my-button-text-color': '#ffffff',
    '--my-button-hover-bg-color': mixColor(props.color, '#ffffff', 20),
    '--my-button-hover-border-color': mixColor(props.color, '#ffffff', 20),
    '--my-button-hover-text-color': '#ffffff',
    '--my-button-active-bg-color': mixColor(props.color, '#000000', 16),
    '--my-button-active-border-color': mixColor(props.color, '#000000', 16),
  } as CSSProperties
})

/**
 * 自动在两个中文字符之间插入空格（仅对单个纯文本子节点处理，与 EP 一致）
 * 返回 null 表示走原始 slot 渲染
 */
const autoSpaceText = computed<string | null>(() => {
  if (!props.autoInsertSpace) return null
  const nodes = slots.default?.() ?? []
  if (nodes.length !== 1) return null
  const child = nodes[0].children
  if (typeof child !== 'string') return null
  return /^[一-龥]{2}$/.test(child) ? `${child[0]} ${child[1]}` : null
})

function handleClick(event: MouseEvent): void {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<template>
  <component
    :is="tag"
    class="my-button"
    :class="[
      `my-button--${actualType}`,
      `my-button--${actualSize}`,
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-dashed': dashed,
        'is-text': text,
        'is-bg': text && bg,
        'is-link': link,
        'is-has-bg': !!color,
      },
    ]"
    :style="colorVars"
    :type="tag === 'button' ? nativeType : undefined"
    :disabled="tag === 'button' && (disabled || loading)"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    :autofocus="autofocus || undefined"
    @click="handleClick"
  >
    <span v-if="loading" class="my-button__loading" aria-hidden="true">
      <slot name="loading">
        <span class="my-button__loading-circle" />
      </slot>
    </span>
    <span v-if="$slots.icon && !loading" class="my-button__icon">
      <slot name="icon" />
    </span>
    <span v-if="$slots.default" class="my-button__content">
      <template v-if="autoSpaceText !== null">{{ autoSpaceText }}</template>
      <slot v-else />
    </span>
  </component>
</template>
