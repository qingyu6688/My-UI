<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { usePopper } from '../../../hooks/use-popper'
import { formatDate, isSameDay } from '../../../utils/date'
import { MyButton } from '../../button'
import type { DateTimePickerEmits, DateTimePickerProps } from './date-time-picker'

defineOptions({
  name: 'MyDateTimePicker',
})

const props = withDefaults(defineProps<DateTimePickerProps>(), {
  modelValue: '',
  placeholder: '选择日期时间',
  disabled: false,
  clearable: false,
  size: 'default',
})

const emit = defineEmits<DateTimePickerEmits>()

const { visible, triggerRef, popperRef, popperStyle, toggle, close } = usePopper({
  placement: 'bottom-start',
  offset: 6,
})

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']
const isHovering = ref(false)

function parse(value: string): Date | null {
  if (!value) return null
  const date = new Date(value.replace(' ', 'T'))
  return Number.isNaN(date.getTime()) ? null : date
}

const selected = computed(() => parse(props.modelValue))
const panelDate = ref(selected.value ?? new Date())
const hour = ref(selected.value?.getHours() ?? 0)
const minute = ref(selected.value?.getMinutes() ?? 0)

watch(
  () => props.modelValue,
  () => {
    const parsed = selected.value
    if (parsed) {
      panelDate.value = new Date(parsed.getFullYear(), parsed.getMonth(), 1)
      hour.value = parsed.getHours()
      minute.value = parsed.getMinutes()
    }
  },
)

const title = computed(() => `${panelDate.value.getFullYear()} 年 ${panelDate.value.getMonth() + 1} 月`)

interface Cell {
  date: Date
  day: number
  isCurrentMonth: boolean
}

const cells = computed<Cell[]>(() => {
  const year = panelDate.value.getFullYear()
  const month = panelDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const start = new Date(year, month, 1 - firstDay)
  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
    return { date, day: date.getDate(), isCurrentMonth: date.getMonth() === month }
  })
})

const pad = (n: number): string => String(n).padStart(2, '0')
const selectedDay = ref<Date | null>(selected.value)

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

function pickDay(cell: Cell): void {
  selectedDay.value = cell.date
}

function commit(): void {
  const day = selectedDay.value ?? new Date()
  const result = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour.value, minute.value)
  const value = formatDate(result, 'YYYY-MM-DD HH:mm')
  emit('update:modelValue', value)
  emit('change', value)
  close()
}

function clear(): void {
  emit('update:modelValue', '')
  emit('change', '')
}

function isSelectedDay(date: Date): boolean {
  return selectedDay.value ? isSameDay(date, selectedDay.value) : false
}
</script>

<template>
  <div
    class="my-date-time-picker"
    :class="[`my-date-time-picker--${size}`, { 'is-disabled': disabled }]"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div ref="triggerRef" class="my-date-time-picker__trigger" @click="onTriggerClick">
      <span v-if="modelValue" class="my-date-time-picker__value">{{ modelValue }}</span>
      <span v-else class="my-date-time-picker__placeholder">{{ placeholder }}</span>
      <button
        v-if="showClear"
        type="button"
        class="my-date-time-picker__clear"
        aria-label="清空"
        @click.stop="clear"
      >
        ×
      </button>
    </div>

    <Teleport to="body">
      <div v-show="visible" ref="popperRef" class="my-date-time-picker__panel" :style="popperStyle">
        <div class="my-date-time-picker__calendar">
          <div class="my-date-time-picker__header">
            <button type="button" @click="changeMonth(-1)">‹</button>
            <span>{{ title }}</span>
            <button type="button" @click="changeMonth(1)">›</button>
          </div>
          <table class="my-date-time-picker__table">
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
                  class="my-date-time-picker__cell"
                  :class="{
                    'is-other-month': !cell.isCurrentMonth,
                    'is-selected': isSelectedDay(cell.date),
                  }"
                  @click="pickDay(cell)"
                >
                  {{ cell.day }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="my-date-time-picker__time">
          <span>{{ pad(hour) }}:{{ pad(minute) }}</span>
          <div class="my-date-time-picker__time-controls">
            <input v-model.number="hour" type="number" min="0" max="23" />
            <input v-model.number="minute" type="number" min="0" max="59" />
          </div>
          <my-button size="small" type="primary" @click="commit">确定</my-button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
