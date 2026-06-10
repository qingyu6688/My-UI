<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch, type CSSProperties } from 'vue'
import type { DialogEmits, DialogProps } from './dialog'

defineOptions({
  name: 'MyDialog',
})

const props = withDefaults(defineProps<DialogProps>(), {
  modelValue: false,
  title: '',
  width: '460px',
  top: '15vh',
  fullscreen: false,
  modal: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true,
  lockScroll: true,
  center: false,
  appendToBody: true,
  beforeClose: undefined,
})

const emit = defineEmits<DialogEmits>()

const innerVisible = ref(props.modelValue)
const dialogRef = ref<HTMLElement | null>(null)

const dialogStyle = computed<CSSProperties>(() => {
  if (props.fullscreen) return {}
  return {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    marginTop: props.top,
  }
})

watch(
  () => props.modelValue,
  (value) => {
    innerVisible.value = value
    if (value) {
      handleOpen()
    }
  },
)

function lockBodyScroll(lock: boolean): void {
  if (!props.lockScroll || typeof document === 'undefined') return
  document.body.style.overflow = lock ? 'hidden' : ''
}

function handleOpen(): void {
  emit('open')
  lockBodyScroll(true)
  void nextTick(() => {
    dialogRef.value?.focus()
    emit('opened')
  })
}

function doClose(): void {
  innerVisible.value = false
  emit('update:modelValue', false)
  emit('close')
  lockBodyScroll(false)
}

function handleClose(): void {
  if (props.beforeClose) {
    props.beforeClose(doClose)
    return
  }
  doClose()
}

function handleModalClick(): void {
  if (props.closeOnClickModal) {
    handleClose()
  }
}

function handleEscape(event: KeyboardEvent): void {
  if (event.key === 'Escape' && props.closeOnPressEscape && innerVisible.value) {
    handleClose()
  }
}

function onAfterLeave(): void {
  emit('closed')
}

watch(
  innerVisible,
  (value) => {
    if (typeof document === 'undefined') return
    if (value) {
      document.addEventListener('keydown', handleEscape)
    } else {
      document.removeEventListener('keydown', handleEscape)
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('keydown', handleEscape)
  }
  lockBodyScroll(false)
})
</script>

<template>
  <Teleport to="body" :disabled="!appendToBody">
    <transition name="my-dialog-fade" @after-leave="onAfterLeave">
      <div
        v-show="innerVisible"
        class="my-dialog__wrapper"
        :class="{ 'is-modal': modal }"
        @click.self="modal && handleModalClick()"
      >
        <div
          ref="dialogRef"
          class="my-dialog"
          :class="{ 'is-fullscreen': fullscreen, 'is-center': center }"
          :style="dialogStyle"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? 'my-dialog-title' : undefined"
          tabindex="-1"
        >
          <header class="my-dialog__header">
            <slot name="header">
              <span id="my-dialog-title" class="my-dialog__title">{{ title }}</span>
            </slot>
            <button
              v-if="showClose"
              type="button"
              class="my-dialog__close"
              aria-label="关闭"
              @click="handleClose"
            >
              ×
            </button>
          </header>
          <div class="my-dialog__body">
            <slot />
          </div>
          <footer v-if="$slots.footer" class="my-dialog__footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
