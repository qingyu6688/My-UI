<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CalendarCell, CalendarEmits, CalendarProps } from './calendar'

defineOptions({
  name: 'MyCalendar',
})

const props = withDefaults(defineProps<CalendarProps>(), {
  modelValue: undefined,
})

const emit = defineEmits<CalendarEmits>()

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']

const selected = computed(() => props.modelValue ?? new Date())
const panelDate = ref(new Date(selected.value.getFullYear(), selected.value.getMonth(), 1))

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

const cells = computed<CalendarCell[]>(() => {
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

const title = computed(() => `${panelDate.value.getFullYear()} 年 ${panelDate.value.getMonth() + 1} 月`)

function changeMonth(delta: number): void {
  panelDate.value = new Date(panelDate.value.getFullYear(), panelDate.value.getMonth() + delta, 1)
  emit('panelChange', panelDate.value)
}

function selectDate(cell: CalendarCell): void {
  emit('update:modelValue', cell.date)
  if (!cell.isCurrentMonth) {
    panelDate.value = new Date(cell.date.getFullYear(), cell.date.getMonth(), 1)
  }
}
</script>

<template>
  <div class="my-calendar">
    <div class="my-calendar__header">
      <span class="my-calendar__title">{{ title }}</span>
      <div class="my-calendar__nav">
        <button type="button" @click="changeMonth(-1)">‹</button>
        <button type="button" @click="changeMonth(1)">›</button>
      </div>
    </div>
    <table class="my-calendar__table">
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
            class="my-calendar__cell"
            :class="{
              'is-other-month': !cell.isCurrentMonth,
              'is-today': cell.isToday,
              'is-selected': isSameDay(cell.date, selected),
            }"
            @click="selectDate(cell)"
          >
            <slot name="date" :date="cell.date">{{ cell.day }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
