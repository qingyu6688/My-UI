<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({ single: '', multi: [] as string[] })

const options = [
  { value: 'design', label: '设计' },
  { value: 'frontend', label: '前端' },
  { value: 'backend', label: '后端' },
]
</script>

<template>
  <my-space wrap>
    <my-select v-model="state.single" placeholder="单选" style="width: 180px;">
      <my-option v-for="o in options" :key="o.value" :value="o.value" :label="o.label" />
    </my-select>
    <my-select v-model="state.multi" multiple placeholder="多选" style="width: 220px;">
      <my-option v-for="o in options" :key="o.value" :value="o.value" :label="o.label" />
    </my-select>
  </my-space>
</template>
