<script setup lang="ts">
import { computed, inject, type CSSProperties } from 'vue'
import { rowContextKey, type ColProps } from './layout'

defineOptions({
  name: 'MyCol',
})

const props = withDefaults(defineProps<ColProps>(), {
  span: 24,
  offset: 0,
  push: 0,
  pull: 0,
  tag: 'div',
})

const row = inject(rowContextKey, undefined)

const style = computed<CSSProperties>(() => {
  const gutter = row?.gutter.value ?? 0
  if (gutter === 0) return {}
  const half = gutter / 2
  return { paddingLeft: `${half}px`, paddingRight: `${half}px` }
})

const colClass = computed(() => [
  `my-col-${props.span}`,
  {
    [`my-col-offset-${props.offset}`]: props.offset > 0,
    [`my-col-push-${props.push}`]: props.push > 0,
    [`my-col-pull-${props.pull}`]: props.pull > 0,
  },
])
</script>

<template>
  <component :is="tag" class="my-col" :class="colClass" :style="style">
    <slot />
  </component>
</template>
