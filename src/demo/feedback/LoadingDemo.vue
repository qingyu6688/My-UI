<script setup lang="ts">
import { MyLoading } from '../../../packages/my-ui'

function show(): void {
  const instance = MyLoading({ fullscreen: true, text: '加载中...' })
  setTimeout(() => instance.close(), 1500)
}
</script>

<template>
  <my-button type="primary" @click="show">显示加载 1.5s</my-button>
</template>
