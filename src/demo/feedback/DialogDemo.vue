<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <my-button type="primary" @click="visible = true">打开对话框</my-button>
  <my-dialog v-model="visible" title="对话框标题" width="420px">
    <p>这是对话框内容，支持遮罩、ESC 关闭与异步确认。</p>
    <template #footer>
      <my-button @click="visible = false">取消</my-button>
      <my-button type="primary" @click="visible = false">确定</my-button>
    </template>
  </my-dialog>
</template>
