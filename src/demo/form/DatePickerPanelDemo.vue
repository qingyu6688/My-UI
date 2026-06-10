<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <my-date-picker-panel v-model="value" />
  <p style="margin-top: 8px; color: var(--my-text-color-secondary);">
    当前值：{{ value || '未选择' }}
  </p>
</template>
