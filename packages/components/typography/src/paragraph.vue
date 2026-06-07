<script setup lang="ts">
import type { ParagraphProps } from './typography'

defineOptions({ name: 'MyParagraph' })

withDefaults(defineProps<ParagraphProps>(), {
  spacing: 'default',
})
</script>

<template>
  <p class="my-paragraph" :class="`my-paragraph--${spacing}`">
    <slot />
  </p>
</template>
