<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <my-button type="primary" @click="visible = true">打开抽屉</my-button>
  <my-drawer v-model="visible" title="抽屉标题" size="320px">
    <p>抽屉内容区域，适合承载较多表单或详情。</p>
  </my-drawer>
</template>
