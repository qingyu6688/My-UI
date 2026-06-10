<script setup lang="ts">
import { useSiteLocale } from '../../composables/use-site-locale'

const { text } = useSiteLocale()
</script>

<template>
  <my-space direction="vertical" align="start">
    <my-text>{{ text('默认文本', 'Default text') }}</my-text>
    <my-text type="primary">{{ text('主要文本', 'Primary text') }}</my-text>
    <my-text type="success">{{ text('成功文本', 'Success text') }}</my-text>
    <my-text type="warning">{{ text('警告文本', 'Warning text') }}</my-text>
    <my-text type="danger">{{ text('危险文本', 'Danger text') }}</my-text>
    <my-text size="small">{{ text('小号文本', 'Small text') }}</my-text>
    <my-text truncated style="width: 200px;">
      {{ text('这是一段会被截断并以省略号结尾的长文本内容', 'This long line will be truncated with an ellipsis') }}
    </my-text>
  </my-space>
</template>
