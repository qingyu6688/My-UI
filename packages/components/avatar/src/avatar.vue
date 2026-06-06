<script setup lang="ts">
import { computed, ref, watch, type CSSProperties } from 'vue'
import type { AvatarEmits, AvatarProps } from './avatar'

defineOptions({
  name: 'MyAvatar',
})

const props = withDefaults(defineProps<AvatarProps>(), {
  src: '',
  alt: '',
  shape: 'circle',
  size: 'default',
  fit: 'cover',
  icon: false,
})

const emit = defineEmits<AvatarEmits>()

const loadError = ref(false)

watch(
  () => props.src,
  () => {
    loadError.value = false
  },
)

const showImage = computed(() => Boolean(props.src) && !loadError.value)

const sizeStyle = computed<CSSProperties>(() => {
  if (typeof props.size === 'number') {
    return { width: `${props.size}px`, height: `${props.size}px`, fontSize: `${props.size / 2}px` }
  }
  return {}
})

function handleError(event: Event): void {
  loadError.value = true
  emit('error', event)
}
</script>

<template>
  <span
    class="my-avatar"
    :class="[
      `my-avatar--${shape}`,
      typeof size === 'string' ? `my-avatar--${size}` : '',
    ]"
    :style="sizeStyle"
  >
    <img
      v-if="showImage"
      class="my-avatar__image"
      :src="src"
      :alt="alt"
      :style="{ objectFit: fit }"
      @error="handleError"
    />
    <slot v-else>
      <span class="my-avatar__fallback">{{ alt || '?' }}</span>
    </slot>
  </span>
</template>
