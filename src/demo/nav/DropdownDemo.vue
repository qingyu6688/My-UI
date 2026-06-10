<script setup lang="ts">
import { ref } from 'vue'

const last = ref('')

function onCommand(command: string | number): void {
  last.value = String(command)
}
</script>

<template>
  <my-dropdown trigger="click" @command="onCommand">
    <my-button type="primary">更多操作</my-button>
    <template #dropdown>
      <my-dropdown-item command="edit">编辑</my-dropdown-item>
      <my-dropdown-item command="copy">复制</my-dropdown-item>
      <my-dropdown-item command="delete" divided>删除</my-dropdown-item>
    </template>
  </my-dropdown>
  <my-text v-if="last" type="info" style="margin-left: 12px;">
    最近命令：{{ last }}
  </my-text>
</template>
