<script setup lang="ts">
import { computed, useSlots, type VNode } from 'vue'

defineOptions({
  name: 'MyContainer',
})

const props = withDefaults(defineProps<{ direction?: 'horizontal' | 'vertical' }>(), {
  direction: undefined,
})

const slots = useSlots()

// 未显式指定方向时：含 Aside 子节点则横向，否则纵向
const isVertical = computed(() => {
  if (props.direction) return props.direction === 'vertical'
  const children = slots.default?.() ?? []
  const hasAside = children.some((node: VNode) => {
    const name = (node.type as { name?: string })?.name
    return name === 'MyAside'
  })
  return !hasAside
})
</script>

<template>
  <section class="my-container" :class="{ 'is-vertical': isVertical }">
    <slot />
  </section>
</template>
