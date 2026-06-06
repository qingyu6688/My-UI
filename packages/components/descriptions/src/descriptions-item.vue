<script setup lang="ts">
import type { DescriptionsItemProps } from './descriptions'

// 该组件不直接渲染，仅承载 props 与 slot，由 Descriptions 收集
defineOptions({
  name: 'MyDescriptionsItem',
})

withDefaults(defineProps<DescriptionsItemProps>(), {
  label: '',
  span: 1,
})
</script>

<template>
  <slot />
</template>
