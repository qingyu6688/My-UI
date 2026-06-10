<script setup lang="ts">
import { useSiteLocale } from '../../composables/use-site-locale'

const { text } = useSiteLocale()
</script>

<template>
  <my-scrollbar height="160px">
    <p v-for="n in 20" :key="n" style="padding: 6px 0; margin: 0;">
      {{ text('自定义滚动条内容行', 'Custom scrollbar row') }} {{ n }}
    </p>
  </my-scrollbar>
</template>
