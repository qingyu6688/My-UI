<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string>('')

const options = Array.from({ length: 1000 }, (_, i) => ({
  value: `opt-${i}`,
  label: `选项 ${i + 1}`,
}))
</script>

<template>
  <my-virtualized-select v-model="value" :options="options" placeholder="千项数据下拉" />
</template>
