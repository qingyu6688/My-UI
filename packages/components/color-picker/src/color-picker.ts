export interface ColorPickerProps {
  modelValue?: string
  disabled?: boolean
  predefine?: string[]
  size?: 'small' | 'default' | 'large'
}

export interface ColorPickerEmits {
  'update:modelValue': [value: string]
  change: [value: string]
}
