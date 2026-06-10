<script setup lang="ts">
import { ref } from 'vue'

const active = ref('home')
</script>

<template>
  <my-menu v-model="active" mode="horizontal">
    <my-menu-item index="home">首页</my-menu-item>
    <my-menu-item index="product">产品</my-menu-item>
    <my-sub-menu index="more" title="更多">
      <my-menu-item index="more/docs">文档</my-menu-item>
      <my-menu-item index="more/blog">博客</my-menu-item>
    </my-sub-menu>
  </my-menu>
</template>
