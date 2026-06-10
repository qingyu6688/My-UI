<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const options = [
  { value: 'vue' },
  { value: 'react' },
  { value: 'svelte' },
]
</script>

<template>
  <my-mention v-model="value" :options="options" placeholder="输入 @ 提及" />
</template>
