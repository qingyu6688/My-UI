<script setup lang="ts">
import { ref } from 'vue'

const active = ref('first')
</script>

<template>
  <my-tabs v-model="active">
    <my-tab-pane label="基础信息" name="first">基础信息内容</my-tab-pane>
    <my-tab-pane label="权限设置" name="second">权限设置内容</my-tab-pane>
    <my-tab-pane label="操作日志" name="third">操作日志内容</my-tab-pane>
  </my-tabs>
</template>
