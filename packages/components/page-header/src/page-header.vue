<script setup lang="ts">
defineOptions({
  name: 'MyPageHeader',
})

withDefaults(defineProps<{ title?: string; content?: string }>(), {
  title: '',
  content: '',
})

const emit = defineEmits<{ back: [] }>()
</script>

<template>
  <div class="my-page-header">
    <div class="my-page-header__main">
      <button type="button" class="my-page-header__back" aria-label="返回" @click="emit('back')">
        <slot name="icon">‹</slot>
      </button>
      <div v-if="$slots.breadcrumb" class="my-page-header__breadcrumb">
        <slot name="breadcrumb" />
      </div>
      <span class="my-page-header__title">
        <slot name="title">{{ title }}</slot>
      </span>
      <span v-if="content || $slots.content" class="my-page-header__content">
        <slot name="content">{{ content }}</slot>
      </span>
      <div v-if="$slots.extra" class="my-page-header__extra">
        <slot name="extra" />
      </div>
    </div>
    <div v-if="$slots.default" class="my-page-header__body">
      <slot />
    </div>
  </div>
</template>
