<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

defineOptions({
  name: 'MySplitter',
})

const props = withDefaults(
  defineProps<{
    layout?: 'horizontal' | 'vertical'
    initial?: number
    min?: number
    max?: number
  }>(),
  {
    layout: 'horizontal',
    initial: 50,
    min: 10,
    max: 90,
  },
)

const emit = defineEmits<{ resize: [percent: number] }>()

const rootRef = ref<HTMLElement | null>(null)
const percent = ref(props.initial)
const dragging = ref(false)

function onMove(event: MouseEvent): void {
  if (!dragging.value || !rootRef.value) return
  const rect = rootRef.value.getBoundingClientRect()
  let next =
    props.layout === 'horizontal'
      ? ((event.clientX - rect.left) / rect.width) * 100
      : ((event.clientY - rect.top) / rect.height) * 100
  next = Math.min(Math.max(next, props.min), props.max)
  percent.value = next
  emit('resize', next)
}

function onUp(): void {
  dragging.value = false
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseup', onUp)
}

function onDown(): void {
  dragging.value = true
  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
}

onBeforeUnmount(onUp)
</script>

<template>
  <div
    ref="rootRef"
    class="my-splitter"
    :class="`my-splitter--${layout}`"
  >
    <div class="my-splitter__panel" :style="{ flexBasis: `${percent}%` }">
      <slot name="start" />
    </div>
    <div
      class="my-splitter__bar"
      :class="{ 'is-dragging': dragging }"
      role="separator"
      @mousedown="onDown"
    />
    <div class="my-splitter__panel" :style="{ flexBasis: `${100 - percent}%` }">
      <slot name="end" />
    </div>
  </div>
</template>
