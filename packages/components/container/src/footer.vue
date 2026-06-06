<script setup lang="ts">
defineOptions({ name: 'MyFooter' })
withDefaults(defineProps<{ height?: string }>(), { height: '60px' })
</script>

<template>
  <footer class="my-footer" :style="{ height }">
    <slot />
  </footer>
</template>
