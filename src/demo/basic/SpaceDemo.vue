<script setup lang="ts">
import { useSiteLocale } from '../../composables/use-site-locale'

const { text } = useSiteLocale()
</script>

<template>
  <my-space direction="vertical" align="start" :size="16">
    <my-space>
      <my-button>{{ text('水平 1', 'Horizontal 1') }}</my-button>
      <my-button>{{ text('水平 2', 'Horizontal 2') }}</my-button>
      <my-button>{{ text('水平 3', 'Horizontal 3') }}</my-button>
    </my-space>
    <my-space direction="vertical" align="start">
      <my-tag>{{ text('垂直 1', 'Vertical 1') }}</my-tag>
      <my-tag>{{ text('垂直 2', 'Vertical 2') }}</my-tag>
    </my-space>
  </my-space>
</template>
