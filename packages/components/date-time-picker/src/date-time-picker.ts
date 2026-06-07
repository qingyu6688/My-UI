export interface DateTimePickerProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  size?: 'small' | 'default' | 'large'
}

export interface DateTimePickerEmits {
  'update:modelValue': [value: string]
  change: [value: string]
}
