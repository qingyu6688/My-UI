<script setup lang="ts">
import { onBeforeUnmount, provide, watch } from 'vue'
import { usePopper } from '../../../hooks/use-popper'
import {
  dropdownKey,
  type DropdownCommand,
  type DropdownEmits,
  type DropdownProps,
} from './dropdown'

defineOptions({
  name: 'MyDropdown',
})

const props = withDefaults(defineProps<DropdownProps>(), {
  trigger: 'hover',
  placement: 'bottom',
  disabled: false,
  hideOnClick: true,
})

const emit = defineEmits<DropdownEmits>()

const { visible, triggerRef, popperRef, popperStyle, open, close, toggle } = usePopper({
  placement: props.placement,
  offset: 8,
  closeOnOutsideClick: true,
  closeOnEscape: true,
})

let hideTimer: ReturnType<typeof setTimeout> | null = null

function clearTimer(): void {
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = null
}

function onClick(): void {
  if (props.trigger !== 'click' || props.disabled) return
  toggle()
}

function onEnter(): void {
  if (props.trigger !== 'hover' || props.disabled) return
  clearTimer()
  open()
}

function onLeave(): void {
  if (props.trigger !== 'hover') return
  clearTimer()
  hideTimer = setTimeout(close, 150)
}

provide(dropdownKey, {
  handleCommand: (command: DropdownCommand, disabled: boolean) => {
    if (disabled) return
    emit('command', command)
    if (props.hideOnClick) close()
  },
})

watch(visible, (next) => emit('visibleChange', next))
onBeforeUnmount(clearTimer)
</script>

<template>
  <div class="my-dropdown" @mouseenter="onEnter" @mouseleave="onLeave">
    <span ref="triggerRef" class="my-dropdown__trigger" @click="onClick">
      <slot />
    </span>
    <Teleport to="body">
      <transition name="my-dropdown-fade">
        <div
          v-show="visible"
          ref="popperRef"
          class="my-dropdown__menu"
          :style="popperStyle"
          role="menu"
          @mouseenter="onEnter"
          @mouseleave="onLeave"
        >
          <slot name="dropdown" />
        </div>
      </transition>
    </Teleport>
  </div>
</template>
