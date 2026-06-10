<script setup lang="ts">
import { Notification } from '../../../packages/my-ui'

function show(type: 'success' | 'warning' | 'danger' | 'info'): void {
  Notification[type]({
    title: '通知',
    message: `这是一条 ${type} 类型的通知`,
    position: 'top-right',
  })
}
</script>

<template>
  <my-space wrap>
    <my-button @click="show('success')">成功</my-button>
    <my-button @click="show('warning')">警告</my-button>
    <my-button @click="show('danger')">错误</my-button>
    <my-button @click="show('info')">信息</my-button>
  </my-space>
</template>
