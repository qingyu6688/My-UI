export interface DatePickerProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  format?: string
  size?: 'small' | 'default' | 'large'
}

export interface DatePickerEmits {
  'update:modelValue': [value: string]
  change: [value: string]
}
