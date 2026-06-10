<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { formatDate, isSameDay } from '../../../utils/date'

defineOptions({ name: 'MyDatePickerPanel' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    format?: string
  }>(),
  {
    modelValue: '',
    format: 'YYYY-MM-DD',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']

function parse(value: string): Date | null {
  if (!value) return null
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

const selected = computed(() => parse(props.modelValue))
const panelDate = ref(selected.value ?? new Date())

watch(
  () => props.modelValue,
  () => {
    const parsed = selected.value
    if (parsed) panelDate.value = new Date(parsed.getFullYear(), parsed.getMonth(), 1)
  },
)

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

const title = computed(
  () => `${panelDate.value.getFullYear()} 年 ${panelDate.value.getMonth() + 1} 月`,
)

function changeMonth(delta: number): void {
  panelDate.value = new Date(panelDate.value.getFullYear(), panelDate.value.getMonth() + delta, 1)
}

function pickDay(cell: Cell): void {
  const value = formatDate(cell.date, props.format)
  emit('update:modelValue', value)
  emit('change', value)
}

function isSelectedDay(date: Date): boolean {
  return selected.value ? isSameDay(date, selected.value) : false
}
</script>

<template>
  <div class="my-date-picker-panel">
    <header class="my-date-picker-panel__header">
      <button type="button" @click="changeMonth(-1)">‹</button>
      <span>{{ title }}</span>
      <button type="button" @click="changeMonth(1)">›</button>
    </header>
    <table class="my-date-picker-panel__table">
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
            class="my-date-picker-panel__cell"
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
</template>
