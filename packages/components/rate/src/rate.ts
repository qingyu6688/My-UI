export interface RateProps {
  modelValue?: number
  max?: number
  disabled?: boolean
  allowHalf?: boolean
  readonly?: boolean
  showText?: boolean
  texts?: string[]
}

export interface RateEmits {
  'update:modelValue': [value: number]
  change: [value: number]
}
