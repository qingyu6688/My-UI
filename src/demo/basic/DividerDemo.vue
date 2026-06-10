<script setup lang="ts">
import { useSiteLocale } from '../../composables/use-site-locale'

const { text } = useSiteLocale()
</script>

<template>
  <div>
    <p>{{ text('第一段内容，分割线用于切分不同信息区块。', 'First paragraph. Dividers separate different content blocks.') }}</p>
    <my-divider />
    <p>{{ text('第二段内容。', 'Second paragraph.') }}</p>
    <my-divider content-position="left">{{ text('左侧文字', 'Left text') }}</my-divider>
    <p>{{ text('带文字的分割线。', 'Divider with text.') }}</p>
    <my-divider content-position="center">{{ text('居中文字', 'Centered text') }}</my-divider>
    <div style="display: flex; align-items: center;">
      <span>{{ text('编辑', 'Edit') }}</span>
      <my-divider direction="vertical" />
      <span>{{ text('删除', 'Delete') }}</span>
      <my-divider direction="vertical" />
      <span>{{ text('详情', 'Details') }}</span>
    </div>
  </div>
</template>
