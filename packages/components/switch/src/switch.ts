export const switchSizes = ['small', 'default', 'large'] as const

export type SwitchSize = (typeof switchSizes)[number]
export type SwitchValue = string | number | boolean

export interface SwitchProps {
  modelValue?: SwitchValue
  activeValue?: SwitchValue
  inactiveValue?: SwitchValue
  activeText?: string
  inactiveText?: string
  disabled?: boolean
  loading?: boolean
  size?: SwitchSize
  name?: string
}

export interface SwitchEmits {
  'update:modelValue': [value: SwitchValue]
  change: [value: SwitchValue]
}
