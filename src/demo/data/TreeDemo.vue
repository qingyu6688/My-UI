<script setup lang="ts">
const data = [
  {
    key: '1',
    label: '设计',
    children: [
      { key: '1-1', label: '视觉' },
      { key: '1-2', label: '交互' },
    ],
  },
  { key: '2', label: '研发' },
]
</script>

<template>
  <my-tree :data="data" show-checkbox default-expand-all />
</template>
