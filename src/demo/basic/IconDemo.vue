<script setup lang="ts">
import { Search, Settings, Star } from 'lucide-vue-next'
</script>

<template>
  <my-space :size="16">
    <my-icon :size="20"><Search /></my-icon>
    <my-icon :size="20" color="var(--my-color-primary)"><Settings /></my-icon>
    <my-icon :size="20" spin><Star /></my-icon>
  </my-space>
</template>
