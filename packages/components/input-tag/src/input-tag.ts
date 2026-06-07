export interface InputTagProps {
  modelValue?: string[]
  placeholder?: string
  disabled?: boolean
  max?: number
  allowDuplicate?: boolean
}

export interface InputTagEmits {
  'update:modelValue': [value: string[]]
  add: [value: string]
  remove: [value: string]
}
