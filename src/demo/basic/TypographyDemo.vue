<script setup lang="ts">
import { useSiteLocale } from '../../composables/use-site-locale'

const { text } = useSiteLocale()
</script>

<template>
  <div>
    <my-title :level="1">{{ text('一级标题', 'Heading Level 1') }}</my-title>
    <my-title :level="2">{{ text('二级标题', 'Heading Level 2') }}</my-title>
    <my-title :level="3">{{ text('三级标题', 'Heading Level 3') }}</my-title>
    <my-paragraph>
      {{
        text(
          '这是一段正文内容，Typography 提供标题与段落语义，配合统一的行高与间距，适合内容型页面的排版。',
          'This paragraph shows semantic titles and body copy with consistent line height and spacing for content pages.',
        )
      }}
    </my-paragraph>
  </div>
</template>
