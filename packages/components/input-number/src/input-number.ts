export const inputNumberSizes = ['small', 'default', 'large'] as const

export type InputNumberSize = (typeof inputNumberSizes)[number]

export interface InputNumberProps {
  modelValue?: number | null
  min?: number
  max?: number
  step?: number
  precision?: number
  size?: InputNumberSize
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
  controls?: boolean
  name?: string
  id?: string
}

export interface InputNumberEmits {
  'update:modelValue': [value: number | null]
  change: [value: number | null, oldValue: number | null]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}
