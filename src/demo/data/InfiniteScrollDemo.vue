<script setup lang="ts">
import { ref } from 'vue'

const items = ref(Array.from({ length: 12 }, (_, i) => i + 1))
const loading = ref(false)

function load(): void {
  if (loading.value) return
  loading.value = true
  setTimeout(() => {
    const last = items.value.at(-1) ?? 0
    items.value.push(...Array.from({ length: 6 }, (_, i) => last + i + 1))
    loading.value = false
  }, 400)
}
</script>

<template>
  <div
    v-infinite-scroll="load"
    style="
      height: 200px;
      overflow-y: auto;
      border: 1px solid var(--my-border-color-light);
      border-radius: 8px;
      padding: 8px 12px;
    "
  >
    <p v-for="item in items" :key="item" style="margin: 4px 0;">列表项 {{ item }}</p>
    <p v-if="loading" style="text-align: center; color: var(--my-text-color-secondary);">
      加载中…
    </p>
  </div>
</template>
