<script setup lang="ts">
import { computed } from 'vue'
import type { TitleProps } from './typography'

defineOptions({ name: 'MyTitle' })

const props = withDefaults(defineProps<TitleProps>(), {
  level: 1,
  bold: true,
})

const tag = computed(() => `h${props.level}`)
</script>

<template>
  <component
    :is="tag"
    class="my-title"
    :class="[`my-title--${level}`, { 'is-bold': bold }]"
  >
    <slot />
  </component>
</template>
