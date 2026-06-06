<script setup lang="ts">
import { computed, ref, watch, type CSSProperties } from 'vue'
import type { ImageEmits, ImageProps } from './image'

defineOptions({
  name: 'MyImage',
})

const props = withDefaults(defineProps<ImageProps>(), {
  alt: '',
  fit: 'cover',
  lazy: false,
  width: undefined,
  height: undefined,
})

const emit = defineEmits<ImageEmits>()

type LoadStatus = 'loading' | 'loaded' | 'error'
const status = ref<LoadStatus>('loading')

watch(
  () => props.src,
  () => {
    status.value = 'loading'
  },
)

const wrapperStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (props.width !== undefined) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.height !== undefined) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return style
})

function handleLoad(event: Event): void {
  status.value = 'loaded'
  emit('load', event)
}

function handleError(event: Event): void {
  status.value = 'error'
  emit('error', event)
}
</script>

<template>
  <span class="my-image" :style="wrapperStyle">
    <img
      v-if="status !== 'error'"
      class="my-image__inner"
      :src="src"
      :alt="alt"
      :loading="lazy ? 'lazy' : 'eager'"
      :style="{ objectFit: fit }"
      @load="handleLoad"
      @error="handleError"
    />
    <span v-if="status === 'loading'" class="my-image__placeholder">
      <slot name="placeholder">加载中…</slot>
    </span>
    <span v-if="status === 'error'" class="my-image__error">
      <slot name="error">加载失败</slot>
    </span>
  </span>
</template>
