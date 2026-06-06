import type { InjectionKey, Ref } from 'vue'

export const checkboxSizes = ['small', 'default', 'large'] as const

export type CheckboxSize = (typeof checkboxSizes)[number]
export type CheckboxValue = string | number | boolean

export interface CheckboxGroupContext {
  modelValue: Ref<CheckboxValue[]>
  size: Ref<CheckboxSize>
  disabled: Ref<boolean>
  min?: Ref<number | undefined>
  max?: Ref<number | undefined>
  toggle: (value: CheckboxValue, checked: boolean) => void
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('MyCheckboxGroup')

export interface CheckboxProps {
  modelValue?: boolean | CheckboxValue[]
  value?: CheckboxValue
  label?: string
  trueValue?: CheckboxValue
  falseValue?: CheckboxValue
  indeterminate?: boolean
  disabled?: boolean
  size?: CheckboxSize
  name?: string
  border?: boolean
}

export interface CheckboxEmits {
  'update:modelValue': [value: boolean | CheckboxValue[]]
  change: [value: boolean | CheckboxValue[]]
}

export interface CheckboxGroupProps {
  modelValue?: CheckboxValue[]
  size?: CheckboxSize
  disabled?: boolean
  min?: number
  max?: number
}

export interface CheckboxGroupEmits {
  'update:modelValue': [value: CheckboxValue[]]
  change: [value: CheckboxValue[]]
}
