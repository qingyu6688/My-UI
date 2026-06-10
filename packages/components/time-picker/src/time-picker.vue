<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { usePopper } from '../../../hooks/use-popper'
import { useSize } from '../../../hooks/use-config'
import { MyButton } from '../../button'
import { formContextKey } from '../../form/src/form'
import type { TimePickerEmits, TimePickerProps } from './time-picker'

defineOptions({
  name: 'MyTimePicker',
})

const props = withDefaults(defineProps<TimePickerProps>(), {
  modelValue: '',
  placeholder: '选择时间',
  disabled: false,
  clearable: false,
  showSeconds: true,
  size: undefined,
})

const form = inject(formContextKey, undefined)
const actualSize = useSize(props, computed(() => form?.size.value))

const emit = defineEmits<TimePickerEmits>()

const { visible, triggerRef, popperRef, popperStyle, toggle, close } = usePopper({
  placement: 'bottom-start',
  offset: 6,
})

const hour = ref(0)
const minute = ref(0)
const second = ref(0)
const isHovering = ref(false)

watch(
  () => props.modelValue,
  (value) => {
    const parts = (value || '').split(':')
    hour.value = Number(parts[0]) || 0
    minute.value = Number(parts[1]) || 0
    second.value = Number(parts[2]) || 0
  },
  { immediate: true },
)

const hours = Array.from({ length: 24 }, (_, i) => i)
const minutes = Array.from({ length: 60 }, (_, i) => i)
const seconds = Array.from({ length: 60 }, (_, i) => i)

const pad = (n: number): string => String(n).padStart(2, '0')

const showClear = computed(
  () => props.clearable && !props.disabled && !!props.modelValue && isHovering.value,
)

function onTriggerClick(): void {
  if (props.disabled) return
  toggle()
}

function commit(): void {
  const value = props.showSeconds
    ? `${pad(hour.value)}:${pad(minute.value)}:${pad(second.value)}`
    : `${pad(hour.value)}:${pad(minute.value)}`
  emit('update:modelValue', value)
  emit('change', value)
}

function pick(type: 'h' | 'm' | 's', value: number): void {
  if (type === 'h') hour.value = value
  else if (type === 'm') minute.value = value
  else second.value = value
  commit()
}

function clear(): void {
  emit('update:modelValue', '')
  emit('change', '')
}
</script>

<template>
  <div
    class="my-time-picker"
    :class="[`my-time-picker--${actualSize}`, { 'is-disabled': disabled }]"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div ref="triggerRef" class="my-time-picker__trigger" @click="onTriggerClick">
      <span v-if="modelValue" class="my-time-picker__value">{{ modelValue }}</span>
      <span v-else class="my-time-picker__placeholder">{{ placeholder }}</span>
      <button
        v-if="showClear"
        type="button"
        class="my-time-picker__clear"
        aria-label="清空"
        @click.stop="clear"
      >
        ×
      </button>
      <span v-else class="my-time-picker__icon" aria-hidden="true">🕐</span>
    </div>

    <Teleport to="body">
      <div v-show="visible" ref="popperRef" class="my-time-picker__panel" :style="popperStyle">
        <div class="my-time-picker__column">
          <div
            v-for="h in hours"
            :key="`h-${h}`"
            class="my-time-picker__cell"
            :class="{ 'is-active': h === hour }"
            @click="pick('h', h)"
          >
            {{ pad(h) }}
          </div>
        </div>
        <div class="my-time-picker__column">
          <div
            v-for="m in minutes"
            :key="`m-${m}`"
            class="my-time-picker__cell"
            :class="{ 'is-active': m === minute }"
            @click="pick('m', m)"
          >
            {{ pad(m) }}
          </div>
        </div>
        <div v-if="showSeconds" class="my-time-picker__column">
          <div
            v-for="s in seconds"
            :key="`s-${s}`"
            class="my-time-picker__cell"
            :class="{ 'is-active': s === second }"
            @click="pick('s', s)"
          >
            {{ pad(s) }}
          </div>
        </div>
        <div class="my-time-picker__footer">
          <my-button size="small" type="primary" @click="close">确定</my-button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
