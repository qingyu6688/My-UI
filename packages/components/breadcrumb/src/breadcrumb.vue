<script setup lang="ts">
import { provide, toRef } from 'vue'
import { breadcrumbKey, type BreadcrumbProps } from './breadcrumb'

defineOptions({
  name: 'MyBreadcrumb',
})

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  separator: '/',
})

provide(breadcrumbKey, {
  separator: toRef(props, 'separator'),
})
</script>

<template>
  <nav class="my-breadcrumb" aria-label="breadcrumb">
    <slot />
  </nav>
</template>
