<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import { usePopper } from '../../../hooks/use-popper'
import { MyButton } from '../../button'
import type { PopconfirmEmits, PopconfirmProps } from './popconfirm'

defineOptions({
  name: 'MyPopconfirm',
})

const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: '确定执行此操作吗？',
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  placement: 'top',
  disabled: false,
  width: 200,
  icon: '!',
  hideIcon: false,
})

const emit = defineEmits<PopconfirmEmits>()

const { visible, triggerRef, popperRef, popperStyle, open, close, toggle } = usePopper({
  placement: props.placement,
  offset: 8,
  closeOnOutsideClick: true,
  closeOnEscape: true,
})

function onTriggerClick(): void {
  if (props.disabled) return
  toggle()
}

function handleConfirm(event: MouseEvent): void {
  emit('confirm', event)
  close()
}

function handleCancel(event: MouseEvent): void {
  emit('cancel', event)
  close()
}

const panelStyle = computed<CSSProperties>(() => {
  const base = { ...(popperStyle.value as CSSProperties) }
  base.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  return base
})

defineExpose({ open, close })
</script>

<template>
  <span ref="triggerRef" class="my-popconfirm__trigger" @click="onTriggerClick">
    <slot />
  </span>
  <Teleport to="body">
    <transition name="my-popconfirm-fade">
      <div
        v-show="visible"
        ref="popperRef"
        class="my-popconfirm"
        :style="panelStyle"
        role="dialog"
      >
        <div class="my-popconfirm__main">
          <span v-if="!hideIcon" class="my-popconfirm__icon" aria-hidden="true">{{ icon }}</span>
          <span class="my-popconfirm__title">
            <slot name="title">{{ title }}</slot>
          </span>
        </div>
        <div class="my-popconfirm__actions">
          <my-button size="small" @click="handleCancel">{{ cancelButtonText }}</my-button>
          <my-button size="small" type="primary" @click="handleConfirm">
            {{ confirmButtonText }}
          </my-button>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
