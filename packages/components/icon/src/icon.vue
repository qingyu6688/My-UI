<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import type { IconProps } from './icon'

defineOptions({
  name: 'MyIcon',
})

const props = withDefaults(defineProps<IconProps>(), {
  size: undefined,
  color: undefined,
  spin: false,
  rotate: 0,
  label: undefined,
})

function normalizeSize(value: number | string | undefined): string | undefined {
  if (value === undefined) {
    return undefined
  }
  return typeof value === 'number' ? `${value}px` : value
}

const iconStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  const fontSize = normalizeSize(props.size)
  if (fontSize) {
    style.fontSize = fontSize
    style.width = fontSize
    style.height = fontSize
  }
  if (props.color) {
    style.color = props.color
  }
  if (props.rotate) {
    style.transform = `rotate(${props.rotate}deg)`
  }
  return style
})

interface AriaProps {
  role?: 'img'
  'aria-label'?: string
  'aria-hidden'?: boolean
}

const ariaProps = computed<AriaProps>(() => {
  if (props.label) {
    return { role: 'img', 'aria-label': props.label }
  }
  return { 'aria-hidden': true }
})
</script>

<template>
  <i
    class="my-icon"
    :class="{ 'is-spin': spin }"
    :style="iconStyle"
    v-bind="ariaProps"
  >
    <slot />
  </i>
</template>
