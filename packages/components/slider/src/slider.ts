export interface SliderProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  showTooltip?: boolean
  showStops?: boolean
}

export interface SliderEmits {
  'update:modelValue': [value: number]
  change: [value: number]
}
