<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({ text: '', password: '', area: '' })
</script>

<template>
  <my-space direction="vertical" style="width: 100%; max-width: 320px;">
    <my-input v-model="state.text" clearable placeholder="可清空输入" />
    <my-input v-model="state.password" type="password" show-password placeholder="密码输入" />
    <my-input v-model="state.area" type="textarea" :rows="2" placeholder="多行文本" />
  </my-space>
</template>
