<script setup lang="ts">
import { ref } from 'vue'
import type { AutocompleteItem } from '../../../packages/my-ui'

const value = ref('')
const fruits = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango']

function fetchSuggestions(query: string, cb: (items: AutocompleteItem[]) => void): void {
  const list = fruits
    .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    .map((v) => ({ value: v }))
  cb(list)
}
</script>

<template>
  <my-autocomplete
    v-model="value"
    :fetch-suggestions="fetchSuggestions"
    placeholder="输入水果名"
  />
</template>
