<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch, type CSSProperties } from 'vue'
import type { DrawerEmits, DrawerProps } from './drawer'

defineOptions({
  name: 'MyDrawer',
})

const props = withDefaults(defineProps<DrawerProps>(), {
  modelValue: false,
  title: '',
  direction: 'rtl',
  size: '30%',
  modal: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true,
  lockScroll: true,
  appendToBody: true,
  beforeClose: undefined,
})

const emit = defineEmits<DrawerEmits>()

const innerVisible = ref(props.modelValue)
const panelRef = ref<HTMLElement | null>(null)

const isHorizontal = computed(() => props.direction === 'ltr' || props.direction === 'rtl')

const panelStyle = computed<CSSProperties>(() => {
  const size = typeof props.size === 'number' ? `${props.size}px` : props.size
  return isHorizontal.value ? { width: size } : { height: size }
})

watch(
  () => props.modelValue,
  (value) => {
    innerVisible.value = value
    if (value) handleOpen()
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
    panelRef.value?.focus()
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
  if (props.closeOnClickModal) handleClose()
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
    <transition :name="`my-drawer-${direction}`" @after-leave="onAfterLeave">
      <div
        v-show="innerVisible"
        class="my-drawer__wrapper"
        :class="{ 'is-modal': modal }"
        @click.self="modal && handleModalClick()"
      >
        <div
          ref="panelRef"
          class="my-drawer"
          :class="`my-drawer--${direction}`"
          :style="panelStyle"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? 'my-drawer-title' : undefined"
          tabindex="-1"
        >
          <header class="my-drawer__header">
            <slot name="header">
              <span id="my-drawer-title" class="my-drawer__title">{{ title }}</span>
            </slot>
            <button
              v-if="showClose"
              type="button"
              class="my-drawer__close"
              aria-label="关闭"
              @click="handleClose"
            >
              ×
            </button>
          </header>
          <div class="my-drawer__body">
            <slot />
          </div>
          <footer v-if="$slots.footer" class="my-drawer__footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
