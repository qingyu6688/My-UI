<script setup lang="ts">
import { computed, onBeforeUnmount, watch, type CSSProperties } from 'vue'
import { usePopper } from '../../../hooks/use-popper'
import type { PopoverEmits, PopoverProps } from './popover'

defineOptions({
  name: 'MyPopover',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopoverProps>(), {
  title: '',
  content: '',
  placement: 'bottom',
  trigger: 'hover',
  disabled: false,
  width: undefined,
  offset: 8,
  showDelay: 0,
  hideDelay: 150,
})

const emit = defineEmits<PopoverEmits>()

const { visible, triggerRef, popperRef, popperStyle, open, close, toggle } = usePopper({
  placement: props.placement,
  offset: props.offset,
  closeOnOutsideClick: props.trigger === 'click',
  closeOnEscape: true,
})

let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

function clearTimers(): void {
  if (showTimer) clearTimeout(showTimer)
  if (hideTimer) clearTimeout(hideTimer)
  showTimer = null
  hideTimer = null
}

function scheduleOpen(): void {
  if (props.disabled) return
  clearTimers()
  if (props.showDelay > 0) {
    showTimer = setTimeout(open, props.showDelay)
  } else {
    open()
  }
}

function scheduleClose(): void {
  clearTimers()
  if (props.hideDelay > 0) {
    hideTimer = setTimeout(close, props.hideDelay)
  } else {
    close()
  }
}

function onClick(): void {
  if (props.trigger !== 'click' || props.disabled) return
  toggle()
}

function onEnter(): void {
  if (props.trigger === 'hover') scheduleOpen()
}

function onLeave(): void {
  if (props.trigger === 'hover') scheduleClose()
}

const panelStyle = computed<CSSProperties>(() => {
  const base = { ...(popperStyle.value as CSSProperties) }
  if (props.width !== undefined) {
    base.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  return base
})

watch(visible, (next) => emit('visibleChange', next))
onBeforeUnmount(clearTimers)
</script>

<template>
  <span
    ref="triggerRef"
    class="my-popover__trigger"
    @click="onClick"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <slot />
  </span>
  <Teleport to="body">
    <transition name="my-popover-fade">
      <div
        v-show="visible"
        ref="popperRef"
        class="my-popover"
        :class="`my-popover--${placement}`"
        :style="panelStyle"
        role="tooltip"
        @mouseenter="trigger === 'hover' && clearTimers()"
        @mouseleave="onLeave"
      >
        <div v-if="title || $slots.title" class="my-popover__title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="my-popover__content">
          <slot name="content">{{ content }}</slot>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
