<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { MessageType } from './message'

defineOptions({
  name: 'MyMessage',
})

const props = withDefaults(
  defineProps<{
    message: string
    type?: MessageType
    duration?: number
    showClose?: boolean
    center?: boolean
    repeat?: number
  }>(),
  {
    type: 'info',
    duration: 3000,
    showClose: false,
    center: false,
    repeat: 1,
  },
)

const emit = defineEmits<{
  close: []
}>()

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const iconText = computed(() => {
  switch (props.type) {
    case 'success':
      return '✓'
    case 'warning':
      return '!'
    case 'danger':
      return '×'
    default:
      return 'i'
  }
})

function startTimer(): void {
  if (props.duration <= 0) return
  timer = setTimeout(close, props.duration)
}

function clearTimer(): void {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

function close(): void {
  visible.value = false
}

function onAfterLeave(): void {
  emit('close')
}

onMounted(() => {
  visible.value = true
  startTimer()
})

defineExpose({ close, clearTimer, startTimer })
</script>

<template>
  <transition name="my-message-fade" @after-leave="onAfterLeave">
    <div
      v-show="visible"
      class="my-message"
      :class="[
        `my-message--${type}`,
        { 'is-center': center },
      ]"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <span class="my-message__icon" aria-hidden="true">{{ iconText }}</span>
      <span class="my-message__content">{{ message }}</span>
      <span v-if="repeat > 1" class="my-message__badge">{{ repeat }}</span>
      <button
        v-if="showClose"
        type="button"
        class="my-message__close"
        aria-label="关闭"
        @click="close"
      >
        ×
      </button>
    </div>
  </transition>
</template>
