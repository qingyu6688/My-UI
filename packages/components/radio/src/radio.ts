import type { InjectionKey, Ref } from 'vue'

export const radioSizes = ['small', 'default', 'large'] as const

export type RadioSize = (typeof radioSizes)[number]
export type RadioValue = string | number | boolean

export interface RadioGroupContext {
  modelValue: Ref<RadioValue | undefined>
  size: Ref<RadioSize>
  disabled: Ref<boolean>
  name: Ref<string | undefined>
  setValue: (value: RadioValue) => void
}

export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('MyRadioGroup')

export interface RadioProps {
  modelValue?: RadioValue
  value: RadioValue
  label?: string
  disabled?: boolean
  size?: RadioSize
  name?: string
  border?: boolean
}

export interface RadioEmits {
  'update:modelValue': [value: RadioValue]
  change: [value: RadioValue]
}

export interface RadioGroupProps {
  modelValue?: RadioValue
  size?: RadioSize
  disabled?: boolean
  name?: string
}

export interface RadioGroupEmits {
  'update:modelValue': [value: RadioValue]
  change: [value: RadioValue]
}
