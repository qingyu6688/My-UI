<script setup lang="ts">
const data = Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `用户 ${i + 1}`,
  email: `user${i + 1}@example.com`,
}))

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '邮箱' },
]
</script>

<template>
  <my-virtualized-table :data="data" :columns="columns" :height="320" :item-height="40" />
</template>
