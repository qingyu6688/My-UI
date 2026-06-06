<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import type { TextProps } from './text'

defineOptions({
  name: 'MyText',
})

const props = withDefaults(defineProps<TextProps>(), {
  type: 'default',
  size: 'default',
  tag: 'span',
  truncated: false,
  lineClamp: 0,
  mark: false,
})

const clampStyle = computed<CSSProperties>(() => {
  if (props.lineClamp > 0) {
    return {
      display: '-webkit-box',
      WebkitLineClamp: String(props.lineClamp),
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    }
  }
  return {}
})
</script>

<template>
  <component
    :is="tag"
    class="my-text"
    :class="[
      `my-text--${type}`,
      `my-text--${size}`,
      {
        'is-truncated': truncated,
        'is-clamp': lineClamp > 0,
        'is-mark': mark,
      },
    ]"
    :style="clampStyle"
  >
    <slot />
  </component>
</template>
