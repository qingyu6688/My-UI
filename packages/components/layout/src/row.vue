<script setup lang="ts">
import { computed, provide, toRef, type CSSProperties } from 'vue'
import { rowContextKey, type RowProps } from './layout'

defineOptions({
  name: 'MyRow',
})

const props = withDefaults(defineProps<RowProps>(), {
  gutter: 0,
  justify: 'start',
  align: undefined,
  tag: 'div',
})

provide(rowContextKey, { gutter: toRef(props, 'gutter') })

const style = computed<CSSProperties>(() => {
  if (props.gutter === 0) return {}
  const half = props.gutter / 2
  return { marginLeft: `-${half}px`, marginRight: `-${half}px` }
})

const justifyValue = computed(() =>
  props.justify === 'start' || props.justify === 'end' ? `flex-${props.justify}` : props.justify,
)
const alignValue = computed(() => {
  switch (props.align) {
    case 'top':
      return 'flex-start'
    case 'bottom':
      return 'flex-end'
    case 'middle':
      return 'center'
    default:
      return undefined
  }
})
</script>

<template>
  <component
    :is="tag"
    class="my-row"
    :style="[style, { justifyContent: justifyValue, alignItems: alignValue }]"
  >
    <slot />
  </component>
</template>
