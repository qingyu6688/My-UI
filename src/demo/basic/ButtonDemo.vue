<script setup lang="ts">
import { useSiteLocale } from '../../composables/use-site-locale'

const { text } = useSiteLocale()
</script>

<template>
  <my-space wrap>
    <my-button>{{ text('默认', 'Default') }}</my-button>
    <my-button type="primary">{{ text('主要', 'Primary') }}</my-button>
    <my-button type="success">{{ text('成功', 'Success') }}</my-button>
    <my-button type="warning">{{ text('警告', 'Warning') }}</my-button>
    <my-button type="danger">{{ text('危险', 'Danger') }}</my-button>
    <my-button type="primary" plain>{{ text('朴素', 'Plain') }}</my-button>
    <my-button type="primary" round>{{ text('圆角', 'Round') }}</my-button>
    <my-button type="primary" disabled>{{ text('禁用', 'Disabled') }}</my-button>
    <my-button type="primary" loading>{{ text('加载中', 'Loading') }}</my-button>
  </my-space>
</template>
