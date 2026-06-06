<script setup lang="ts">
import { computed, inject } from 'vue'
import { breadcrumbKey, type BreadcrumbItemProps } from './breadcrumb'

defineOptions({
  name: 'MyBreadcrumbItem',
})

const props = withDefaults(defineProps<BreadcrumbItemProps>(), {
  to: undefined,
  replace: false,
})

const breadcrumb = inject(breadcrumbKey)
const separator = computed(() => breadcrumb?.separator.value ?? '/')
const isLink = computed(() => Boolean(props.to))
</script>

<template>
  <span class="my-breadcrumb-item">
    <a
      v-if="isLink"
      class="my-breadcrumb-item__link"
      :href="to"
      @click="replace && $event.preventDefault()"
    >
      <slot />
    </a>
    <span v-else class="my-breadcrumb-item__text">
      <slot />
    </span>
    <span class="my-breadcrumb-item__separator" aria-hidden="true">{{ separator }}</span>
  </span>
</template>
