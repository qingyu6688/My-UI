export interface TimeSelectProps {
  modelValue?: string
  start?: string
  end?: string
  step?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  size?: 'small' | 'default' | 'large'
}

export interface TimeSelectEmits {
  'update:modelValue': [value: string]
  change: [value: string]
}
