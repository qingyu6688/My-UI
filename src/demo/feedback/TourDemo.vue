<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const steps = [
  { target: '#tour-step-1', title: '第一步', description: '这是引导的第一步说明。' },
  { target: '#tour-step-2', title: '第二步', description: '这是引导的第二步说明。' },
]
</script>

<template>
  <my-space>
    <my-button id="tour-step-1">功能一</my-button>
    <my-button id="tour-step-2">功能二</my-button>
    <my-button type="primary" @click="visible = true">开始引导</my-button>
  </my-space>
  <my-tour v-model="visible" :steps="steps" />
</template>
