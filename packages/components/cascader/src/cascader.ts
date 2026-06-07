export interface CascaderOption {
  label: string
  value: string | number
  disabled?: boolean
  children?: CascaderOption[]
}

export interface CascaderProps {
  modelValue?: Array<string | number>
  options: CascaderOption[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  separator?: string
  size?: 'small' | 'default' | 'large'
}

export interface CascaderEmits {
  'update:modelValue': [value: Array<string | number>]
  change: [value: Array<string | number>]
}
