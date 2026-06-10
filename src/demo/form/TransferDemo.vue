<script setup lang="ts">
import { ref } from 'vue'

const value = ref<Array<string | number>>([2])

const data = [
  { key: 1, label: '选项 1' },
  { key: 2, label: '选项 2' },
  { key: 3, label: '选项 3' },
  { key: 4, label: '选项 4' },
]
</script>

<template>
  <my-transfer v-model="value" :data="data" filterable />
</template>
