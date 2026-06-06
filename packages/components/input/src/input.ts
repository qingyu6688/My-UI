export const inputTypes = ['text', 'password', 'textarea', 'email', 'url', 'tel', 'search'] as const
export const inputSizes = ['small', 'default', 'large'] as const

export type InputType = (typeof inputTypes)[number]
export type InputSize = (typeof inputSizes)[number]

export interface InputProps {
  modelValue?: string | number
  type?: InputType
  size?: InputSize
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  showPassword?: boolean
  showWordLimit?: boolean
  maxlength?: number
  rows?: number
  autofocus?: boolean
  name?: string
  id?: string
}

export interface InputEmits {
  'update:modelValue': [value: string]
  input: [value: string]
  change: [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}
