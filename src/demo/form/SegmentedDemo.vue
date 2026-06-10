<script setup lang="ts">
import { ref } from 'vue'

const value = ref('list')

const options = [
  { label: '列表', value: 'list' },
  { label: '看板', value: 'board' },
  { label: '日历', value: 'calendar' },
]
</script>

<template>
  <my-segmented v-model="value" :options="options" />
</template>
