<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { usePopper } from '../../../hooks/use-popper'
import { formatDate, isSameDay, parseDate } from '../../../utils/date'
import type { DatePickerEmits, DatePickerProps } from './date-picker'

defineOptions({
  name: 'MyDatePicker',
})

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: '',
  placeholder: '选择日期',
  disabled: false,
  clearable: false,
  format: 'YYYY-MM-DD',
  size: 'default',
})

const emit = defineEmits<DatePickerEmits>()

const { visible, triggerRef, popperRef, popperStyle, toggle, close } = usePopper({
  placement: 'bottom-start',
  offset: 6,
})

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']
const isHovering = ref(false)

const selectedDate = computed(() => parseDate(props.modelValue))
const panelDate = ref(selectedDate.value ?? new Date())

watch(
  () => props.modelValue,
  () => {
    const parsed = selectedDate.value
    if (parsed) panelDate.value = new Date(parsed.getFullYear(), parsed.getMonth(), 1)
  },
)

const title = computed(() => `${panelDate.value.getFullYear()} 年 ${panelDate.value.getMonth() + 1} 月`)

interface Cell {
  date: Date
  day: number
  isCurrentMonth: boolean
  isToday: boolean
}

const cells = computed<Cell[]>(() => {
  const year = panelDate.value.getFullYear()
  const month = panelDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const start = new Date(year, month, 1 - firstDay)
  const today = new Date()
  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
    return {
      date,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: isSameDay(date, today),
    }
  })
})

const showClear = computed(
  () => props.clearable && !props.disabled && !!props.modelValue && isHovering.value,
)

function onTriggerClick(): void {
  if (props.disabled) return
  toggle()
}

function changeMonth(delta: number): void {
  panelDate.value = new Date(panelDate.value.getFullYear(), panelDate.value.getMonth() + delta, 1)
}

function selectDate(cell: Cell): void {
  const value = formatDate(cell.date, props.format)
  emit('update:modelValue', value)
  emit('change', value)
  close()
}

function clear(): void {
  emit('update:modelValue', '')
  emit('change', '')
}

function isSelected(date: Date): boolean {
  return selectedDate.value ? isSameDay(date, selectedDate.value) : false
}
</script>

<template>
  <div
    class="my-date-picker"
    :class="[`my-date-picker--${size}`, { 'is-disabled': disabled }]"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div ref="triggerRef" class="my-date-picker__trigger" @click="onTriggerClick">
      <span v-if="modelValue" class="my-date-picker__value">{{ modelValue }}</span>
      <span v-else class="my-date-picker__placeholder">{{ placeholder }}</span>
      <button
        v-if="showClear"
        type="button"
        class="my-date-picker__clear"
        aria-label="清空"
        @click.stop="clear"
      >
        ×
      </button>
      <span v-else class="my-date-picker__icon" aria-hidden="true">📅</span>
    </div>

    <Teleport to="body">
      <div v-show="visible" ref="popperRef" class="my-date-picker__panel" :style="popperStyle">
        <div class="my-date-picker__header">
          <button type="button" @click="changeMonth(-1)">‹</button>
          <span class="my-date-picker__title">{{ title }}</span>
          <button type="button" @click="changeMonth(1)">›</button>
        </div>
        <table class="my-date-picker__table">
          <thead>
            <tr>
              <th v-for="day in WEEK_DAYS" :key="day">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in 6" :key="row">
              <td
                v-for="cell in cells.slice((row - 1) * 7, row * 7)"
                :key="cell.date.toISOString()"
                class="my-date-picker__cell"
                :class="{
                  'is-other-month': !cell.isCurrentMonth,
                  'is-today': cell.isToday,
                  'is-selected': isSelected(cell.date),
                }"
                @click="selectDate(cell)"
              >
                {{ cell.day }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Teleport>
  </div>
</template>
