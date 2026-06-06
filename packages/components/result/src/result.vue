<script setup lang="ts">
import { computed } from 'vue'
import type { ResultProps } from './result'

defineOptions({
  name: 'MyResult',
})

const props = withDefaults(defineProps<ResultProps>(), {
  status: 'info',
  title: '',
  subTitle: '',
})

const icon = computed(() => {
  switch (props.status) {
    case 'success':
      return '✓'
    case 'warning':
      return '!'
    case 'danger':
      return '✕'
    default:
      return 'i'
  }
})
</script>

<template>
  <div class="my-result">
    <div class="my-result__icon" :class="`my-result__icon--${status}`">
      <slot name="icon">{{ icon }}</slot>
    </div>
    <p v-if="title || $slots.title" class="my-result__title">
      <slot name="title">{{ title }}</slot>
    </p>
    <p v-if="subTitle || $slots.subTitle" class="my-result__subtitle">
      <slot name="subTitle">{{ subTitle }}</slot>
    </p>
    <div v-if="$slots.extra" class="my-result__extra">
      <slot name="extra" />
    </div>
  </div>
</template>
