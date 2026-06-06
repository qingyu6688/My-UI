<script setup lang="ts">
defineOptions({
  name: 'MyLoadingSpinner',
})

defineProps<{
  text?: string
  background?: string
  fullscreen?: boolean
}>()
</script>

<template>
  <div
    class="my-loading-mask"
    :class="{ 'is-fullscreen': fullscreen }"
    :style="background ? { backgroundColor: background } : undefined"
  >
    <div class="my-loading-spinner">
      <span class="my-loading-circle" />
      <p v-if="text" class="my-loading-text">{{ text }}</p>
    </div>
  </div>
</template>
