<script setup lang="ts">
defineOptions({ name: 'MyAside' })
withDefaults(defineProps<{ width?: string }>(), { width: '240px' })
</script>

<template>
  <aside class="my-aside" :style="{ width }">
    <slot />
  </aside>
</template>
