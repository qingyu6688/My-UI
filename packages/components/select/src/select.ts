import type { InjectionKey, Ref } from 'vue'

export const selectSizes = ['small', 'default', 'large'] as const

export type SelectSize = (typeof selectSizes)[number]
export type SelectValue = string | number | boolean

export interface SelectOptionState {
  value: SelectValue
  label: string
  disabled: boolean
}

export interface SelectContext {
  modelValue: Ref<SelectValue | SelectValue[] | undefined>
  multiple: Ref<boolean>
  size: Ref<SelectSize>
  hoverIndex: Ref<number>
  visibleOptions: Ref<SelectOptionState[]>
  registerOption: (state: SelectOptionState) => void
  unregisterOption: (state: SelectOptionState) => void
  select: (value: SelectValue) => void
}

export const selectContextKey: InjectionKey<SelectContext> = Symbol('MySelect')

export interface SelectProps {
  modelValue?: SelectValue | SelectValue[]
  placeholder?: string
  multiple?: boolean
  disabled?: boolean
  clearable?: boolean
  filterable?: boolean
  remote?: boolean
  remoteMethod?: (query: string) => void | Promise<void>
  size?: SelectSize
  name?: string
  noDataText?: string
}

export interface SelectEmits {
  'update:modelValue': [value: SelectValue | SelectValue[]]
  change: [value: SelectValue | SelectValue[]]
  clear: []
  visibleChange: [visible: boolean]
}

export interface OptionProps {
  value: SelectValue
  label?: string
  disabled?: boolean
}
