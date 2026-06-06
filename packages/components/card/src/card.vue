<script setup lang="ts">
import type { CardProps } from './card'

defineOptions({
  name: 'MyCard',
})

withDefaults(defineProps<CardProps>(), {
  header: '',
  shadow: 'always',
  bodyStyle: undefined,
})
</script>

<template>
  <div class="my-card" :class="`my-card--shadow-${shadow}`">
    <div v-if="header || $slots.header" class="my-card__header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="my-card__body" :style="bodyStyle">
      <slot />
    </div>
    <div v-if="$slots.footer" class="my-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>
