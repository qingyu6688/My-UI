<script setup lang="ts">
const data = [
  { id: 1, name: '苹果', price: 5, category: 'fruit' },
  { id: 2, name: '香蕉', price: 3, category: 'fruit' },
  { id: 3, name: '胡萝卜', price: 2, category: 'vegetable' },
]

const filters = [
  { text: '水果', value: 'fruit' },
  { text: '蔬菜', value: 'vegetable' },
]
</script>

<template>
  <my-table :data="data" row-key="id" stripe border>
    <my-table-column prop="id" label="ID" width="70" />
    <my-table-column prop="name" label="名称" />
    <my-table-column prop="price" label="价格" align="right" sortable />
    <my-table-column prop="category" label="分类" :filters="filters" />
  </my-table>
</template>
