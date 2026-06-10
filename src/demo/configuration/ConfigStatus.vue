<script setup lang="ts">
import { computed } from 'vue'
import { useConfig } from '../../../packages/my-ui'

const config = useConfig()

const items = computed(() => [
  { label: 'namespace', value: config.value.namespace },
  { label: 'size', value: config.value.size },
  { label: 'zIndex', value: String(config.value.zIndex) },
  { label: 'locale', value: config.value.locale.name },
])
</script>

<template>
  <div class="config-status">
    <div v-for="item in items" :key="item.label" class="config-status__item">
      <span class="config-status__label">{{ item.label }}</span>
      <span class="config-status__value">{{ item.value }}</span>
    </div>
  </div>
</template>

<style scoped>
.config-status {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
  padding: 12px 14px;
  border: 1px dashed var(--my-border-color, #d4d7de);
  border-radius: 6px;
  background: var(--my-fill-color-light, #f5f7fa);
  font-family: 'JetBrains Mono', 'Fira Code', Menlo, Consolas, monospace;
  font-size: 12px;
}
.config-status__item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.config-status__label {
  color: var(--my-text-color-secondary, #909399);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.config-status__value {
  color: var(--my-text-color-primary, #303133);
  font-weight: 600;
}
</style>
