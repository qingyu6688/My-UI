<script setup lang="ts">
import { Message } from '../../../packages/my-ui'

function onConfirm(): void {
  Message.success('已删除')
}
</script>

<template>
  <my-popconfirm title="确定删除吗？" @confirm="onConfirm">
    <my-button type="danger">删除</my-button>
  </my-popconfirm>
</template>
