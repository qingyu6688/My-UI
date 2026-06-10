<script setup lang="ts">
import { ref } from 'vue'

const active = ref<string[]>(['1'])
</script>

<template>
  <my-collapse v-model="active">
    <my-collapse-item name="1" title="什么是 My UI">
      基于 Vue 3 的鼠尾草浅黄主题组件库。
    </my-collapse-item>
    <my-collapse-item name="2" title="如何使用">
      安装后通过插件方式全量引入，或按需导入单个组件。
    </my-collapse-item>
  </my-collapse>
</template>
