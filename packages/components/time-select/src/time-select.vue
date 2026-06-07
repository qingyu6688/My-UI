<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePopper } from '../../../hooks/use-popper'
import type { TimeSelectEmits, TimeSelectProps } from './time-select'

defineOptions({
  name: 'MyTimeSelect',
})

const props = withDefaults(defineProps<TimeSelectProps>(), {
  modelValue: '',
  start: '09:00',
  end: '18:00',
  step: '00:30',
  placeholder: '选择时间',
  disabled: false,
  clearable: false,
  size: 'default',
})

const emit = defineEmits<TimeSelectEmits>()

const { visible, triggerRef, popperRef, popperStyle, toggle, close } = usePopper({
  placement: 'bottom-start',
  offset: 6,
})

const isHovering = ref(false)

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function toTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

const options = computed(() => {
  const startMin = toMinutes(props.start)
  const endMin = toMinutes(props.end)
  const stepMin = toMinutes(props.step)
  if (stepMin <= 0) return []
  const result: string[] = []
  for (let t = startMin; t <= endMin; t += stepMin) {
    result.push(toTime(t))
  }
  return result
})

const showClear = computed(
  () => props.clearable && !props.disabled && !!props.modelValue && isHovering.value,
)

function onTriggerClick(): void {
  if (props.disabled) return
  toggle()
}

function pick(time: string): void {
  emit('update:modelValue', time)
  emit('change', time)
  close()
}

function clear(): void {
  emit('update:modelValue', '')
  emit('change', '')
}
</script>

<template>
  <div
    class="my-time-select"
    :class="[`my-time-select--${size}`, { 'is-disabled': disabled }]"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div ref="triggerRef" class="my-time-select__trigger" @click="onTriggerClick">
      <span v-if="modelValue" class="my-time-select__value">{{ modelValue }}</span>
      <span v-else class="my-time-select__placeholder">{{ placeholder }}</span>
      <button
        v-if="showClear"
        type="button"
        class="my-time-select__clear"
        aria-label="清空"
        @click.stop="clear"
      >
        ×
      </button>
    </div>

    <Teleport to="body">
      <div v-show="visible" ref="popperRef" class="my-time-select__panel" :style="popperStyle">
        <div
          v-for="time in options"
          :key="time"
          class="my-time-select__option"
          :class="{ 'is-active': time === modelValue }"
          @click="pick(time)"
        >
          {{ time }}
        </div>
      </div>
    </Teleport>
  </div>
</template>
