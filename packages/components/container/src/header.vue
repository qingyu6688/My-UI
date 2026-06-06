<script setup lang="ts">
defineOptions({ name: 'MyHeader' })
withDefaults(defineProps<{ height?: string }>(), { height: '60px' })
</script>

<template>
  <header class="my-header" :style="{ height }">
    <slot />
  </header>
</template>
