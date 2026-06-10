<script setup lang="ts">
import { Message, MessageBox } from '../../../packages/my-ui'

function openConfirm(): void {
  MessageBox.confirm('确定删除这条数据吗？', '提示').then(
    () => Message.success('已确认'),
    () => Message.info('已取消'),
  )
}

function openPrompt(): void {
  MessageBox.prompt('请输入新的名称', '重命名').then(
    (res) => Message.success(`输入：${res.value}`),
    () => undefined,
  )
}
</script>

<template>
  <my-space>
    <my-button @click="openConfirm">确认框</my-button>
    <my-button @click="openPrompt">输入框</my-button>
  </my-space>
</template>
