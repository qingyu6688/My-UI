<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | number | undefined>(undefined)

const data = [
  {
    key: '1',
    label: '一级 1',
    children: [
      { key: '1-1', label: '二级 1-1' },
      { key: '1-2', label: '二级 1-2' },
    ],
  },
  { key: '2', label: '一级 2' },
]
</script>

<template>
  <my-tree-select v-model="value" :data="data" default-expand-all />
</template>
