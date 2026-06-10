<script setup lang="ts">
import { useSiteLocale } from '../../composables/use-site-locale'

const { text } = useSiteLocale()
</script>

<template>
  <my-space wrap :size="16">
    <my-link>{{ text('默认链接', 'Default link') }}</my-link>
    <my-link type="primary">{{ text('主要链接', 'Primary link') }}</my-link>
    <my-link type="success">{{ text('成功链接', 'Success link') }}</my-link>
    <my-link type="danger" underline="always">{{ text('始终下划线', 'Always underline') }}</my-link>
    <my-link disabled>{{ text('禁用链接', 'Disabled link') }}</my-link>
    <my-link type="primary" href="https://vuejs.org" target="_blank">{{ text('外部链接', 'External link') }}</my-link>
  </my-space>
</template>
