<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'
import { usePopper } from '../../../hooks/use-popper'
import type { TooltipEmits, TooltipProps } from './tooltip'

defineOptions({
  name: 'MyTooltip',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TooltipProps>(), {
  content: '',
  placement: 'top',
  trigger: 'hover',
  disabled: false,
  showDelay: 0,
  hideDelay: 100,
  offset: 8,
  effect: 'dark',
})

const emit = defineEmits<TooltipEmits>()

const { visible, triggerRef, popperRef, popperStyle, open, close, toggle } = usePopper({
  placement: props.placement,
  offset: props.offset,
  closeOnOutsideClick: props.trigger === 'click',
  closeOnEscape: true,
})

let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

function clearTimers(): void {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

function scheduleOpen(): void {
  if (props.disabled) return
  clearTimers()
  if (props.showDelay > 0) {
    showTimer = setTimeout(() => open(), props.showDelay)
  } else {
    open()
  }
}

function scheduleClose(): void {
  clearTimers()
  if (props.hideDelay > 0) {
    hideTimer = setTimeout(() => close(), props.hideDelay)
  } else {
    close()
  }
}

function onTriggerClick(): void {
  if (props.trigger !== 'click' || props.disabled) return
  toggle()
}

function onTriggerEnter(): void {
  if (props.trigger !== 'hover') return
  scheduleOpen()
}

function onTriggerLeave(): void {
  if (props.trigger !== 'hover') return
  scheduleClose()
}

function onTriggerFocus(): void {
  if (props.trigger !== 'focus') return
  scheduleOpen()
}

function onTriggerBlur(): void {
  if (props.trigger !== 'focus') return
  scheduleClose()
}

function onPopperEnter(): void {
  if (props.trigger === 'hover') clearTimers()
}

function onPopperLeave(): void {
  if (props.trigger === 'hover') scheduleClose()
}

watch(visible, (next) => {
  emit('visibleChange', next)
})

onBeforeUnmount(() => clearTimers())
</script>

<template>
  <span
    ref="triggerRef"
    class="my-tooltip__trigger"
    @click="onTriggerClick"
    @mouseenter="onTriggerEnter"
    @mouseleave="onTriggerLeave"
    @focusin="onTriggerFocus"
    @focusout="onTriggerBlur"
  >
    <slot />
  </span>
  <Teleport to="body">
    <transition name="my-tooltip-fade">
      <div
        v-show="visible"
        ref="popperRef"
        class="my-tooltip"
        :class="[`my-tooltip--${effect}`, `my-tooltip--${placement}`]"
        :style="popperStyle"
        role="tooltip"
        @mouseenter="onPopperEnter"
        @mouseleave="onPopperLeave"
      >
        <slot name="content">{{ content }}</slot>
        <span class="my-tooltip__arrow" aria-hidden="true" />
      </div>
    </transition>
  </Teleport>
</template>
