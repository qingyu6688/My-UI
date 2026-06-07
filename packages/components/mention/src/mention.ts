export interface MentionOption {
  value: string
  label?: string
  disabled?: boolean
}

export interface MentionProps {
  modelValue?: string
  options: MentionOption[]
  prefix?: string
  placeholder?: string
  disabled?: boolean
}

export interface MentionEmits {
  'update:modelValue': [value: string]
  select: [option: MentionOption]
}
