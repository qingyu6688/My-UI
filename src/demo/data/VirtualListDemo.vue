<script setup lang="ts">
import { computed } from 'vue'

const items = computed(() =>
  Array.from({ length: 1000 }, (_, i) => `列表项 ${i + 1}`),
)
</script>

<template>
  <my-virtual-list :items="items" :item-height="36" :height="220">
    <template #default="{ item }">{{ item }}</template>
  </my-virtual-list>
</template>
