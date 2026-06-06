import type { InjectionKey, Ref } from 'vue'
import type { FormRule, FormRuleTrigger } from '../../../utils/validator'

export const formSizes = ['small', 'default', 'large'] as const
export const formLabelPositions = ['left', 'right', 'top'] as const

export type FormSize = (typeof formSizes)[number]
export type FormLabelPosition = (typeof formLabelPositions)[number]

export type FormModel = Record<string, unknown>
export type FormRules = Record<string, FormRule | FormRule[]>

export interface FormContext {
  model: Ref<FormModel | undefined>
  rules: Ref<FormRules | undefined>
  size: Ref<FormSize>
  labelPosition: Ref<FormLabelPosition>
  labelWidth: Ref<string | number | undefined>
  disabled: Ref<boolean>
  hideRequiredAsterisk: Ref<boolean>
  showMessage: Ref<boolean>
  registerField: (field: FormItemContext) => void
  unregisterField: (field: FormItemContext) => void
}

export interface FormItemContext {
  prop?: string
  validate: (trigger?: FormRuleTrigger) => Promise<boolean>
  resetField: () => void
  clearValidate: () => void
  rootEl: () => HTMLElement | null
}

export const formContextKey: InjectionKey<FormContext> = Symbol('MyForm')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('MyFormItem')

export interface FormProps {
  model?: FormModel
  rules?: FormRules
  size?: FormSize
  labelPosition?: FormLabelPosition
  labelWidth?: string | number
  disabled?: boolean
  hideRequiredAsterisk?: boolean
  showMessage?: boolean
  scrollToError?: boolean
}

export interface FormEmits {
  validate: [prop: string, valid: boolean, message: string]
}

export interface FormItemProps {
  prop?: string
  label?: string
  labelWidth?: string | number
  required?: boolean
  rules?: FormRule | FormRule[]
  showMessage?: boolean
  error?: string
}

export interface FormExposes {
  validate: () => Promise<boolean>
  validateField: (prop: string | string[]) => Promise<boolean>
  resetFields: () => void
  clearValidate: (prop?: string | string[]) => void
  scrollToField: (prop: string) => void
}
