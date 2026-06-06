<script setup lang="ts">
import { computed } from 'vue'
import type { BadgeProps } from './badge'

defineOptions({
  name: 'MyBadge',
})

const props = withDefaults(defineProps<BadgeProps>(), {
  value: '',
  max: undefined,
  isDot: false,
  hidden: false,
  type: 'danger',
  showZero: false,
})

const content = computed(() => {
  if (props.isDot) return ''
  const value = props.value
  if (typeof value === 'number' && typeof props.max === 'number' && value > props.max) {
    return `${props.max}+`
  }
  return String(value)
})

const visible = computed(() => {
  if (props.hidden) return false
  if (props.isDot) return true
  if (props.value === '' || props.value === undefined || props.value === null) return false
  if (props.value === 0 && !props.showZero) return false
  return true
})
</script>

<template>
  <span class="my-badge">
    <slot />
    <sup
      v-if="visible"
      class="my-badge__content"
      :class="[`my-badge--${type}`, { 'is-dot': isDot, 'is-fixed': $slots.default }]"
    >
      {{ content }}
    </sup>
  </span>
</template>
