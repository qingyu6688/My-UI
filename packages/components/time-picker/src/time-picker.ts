export interface TimePickerProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  showSeconds?: boolean
  size?: 'small' | 'default' | 'large'
}

export interface TimePickerEmits {
  'update:modelValue': [value: string]
  change: [value: string]
}
