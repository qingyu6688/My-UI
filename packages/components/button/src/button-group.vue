<script setup lang="ts">
import { provide, toRef } from 'vue'
import { buttonGroupContextKey, type ButtonGroupProps } from './button'

defineOptions({ name: 'MyButtonGroup' })

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  type: undefined,
  size: undefined,
  direction: 'horizontal',
})

provide(buttonGroupContextKey, {
  type: toRef(props, 'type'),
  size: toRef(props, 'size'),
})
</script>

<template>
  <div
    class="my-button-group"
    :class="{ 'is-vertical': direction === 'vertical' }"
    role="group"
  >
    <slot />
  </div>
</template>
