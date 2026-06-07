export interface InputOtpProps {
  modelValue?: string
  length?: number
  disabled?: boolean
  type?: 'text' | 'number'
}

export interface InputOtpEmits {
  'update:modelValue': [value: string]
  complete: [value: string]
}
