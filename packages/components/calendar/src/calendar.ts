export interface CalendarProps {
  modelValue?: Date
}

export interface CalendarEmits {
  'update:modelValue': [date: Date]
  panelChange: [date: Date]
}

export interface CalendarCell {
  date: Date
  day: number
  isCurrentMonth: boolean
  isToday: boolean
}
