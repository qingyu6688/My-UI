<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { NotificationPosition, NotificationType } from './notification'

defineOptions({ name: 'MyNotification' })

const props = withDefaults(
  defineProps<{
    title?: string
    message: string
    type?: NotificationType
    duration?: number
    position?: NotificationPosition
    showClose?: boolean
  }>(),
  {
    title: '',
    type: 'info',
    duration: 4500,
    position: 'top-right',
    showClose: true,
  },
)

const emit = defineEmits<{ close: []; click: [] }>()

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
  <transition :name="`my-notification-fade-${position}`" @after-leave="onAfterLeave">
    <div
      v-show="visible"
      class="my-notification"
      :class="[`my-notification--${type}`, `my-notification--${position}`]"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      @click="emit('click')"
    >
      <span class="my-notification__icon" aria-hidden="true">{{ iconText }}</span>
      <div class="my-notification__body">
        <p v-if="title" class="my-notification__title">{{ title }}</p>
        <p class="my-notification__message">{{ message }}</p>
      </div>
      <button
        v-if="showClose"
        type="button"
        class="my-notification__close"
        aria-label="关闭"
        @click.stop="close"
      >
        ×
      </button>
    </div>
  </transition>
</template>
