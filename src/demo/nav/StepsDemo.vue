<script setup lang="ts">
import { ref } from 'vue'

const active = ref(1)
</script>

<template>
  <my-steps :active="active">
    <my-step title="填写信息" description="已完成" />
    <my-step title="确认订单" description="进行中" />
    <my-step title="完成" description="待开始" />
  </my-steps>
  <my-space style="margin-top: 12px;">
    <my-button size="small" @click="active = Math.max(0, active - 1)">上一步</my-button>
    <my-button size="small" type="primary" @click="active = Math.min(2, active + 1)">下一步</my-button>
  </my-space>
</template>
