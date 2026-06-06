export type FormRuleTrigger = 'blur' | 'change' | 'submit'
export type FormRuleType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'email' | 'url'

export interface FormRule {
  required?: boolean
  type?: FormRuleType
  min?: number
  max?: number
  len?: number
  pattern?: RegExp
  message?: string
  trigger?: FormRuleTrigger | FormRuleTrigger[]
  validator?: (value: unknown) => boolean | string | Promise<boolean | string>
}

export interface FieldError {
  rule: FormRule
  message: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_PATTERN = /^(https?:)?\/\/[^\s/$.?#].[^\s]*$/i

function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  return false
}

function defaultMessage(rule: FormRule): string {
  if (rule.required) return '该项必填'
  if (rule.type === 'email') return '邮箱格式不正确'
  if (rule.type === 'url') return '链接格式不正确'
  if (rule.pattern) return '格式不正确'
  if (typeof rule.len === 'number') return `长度需为 ${rule.len}`
  if (typeof rule.min === 'number' && typeof rule.max === 'number') {
    return `长度需在 ${rule.min} 到 ${rule.max} 之间`
  }
  if (typeof rule.min === 'number') return `不能小于 ${rule.min}`
  if (typeof rule.max === 'number') return `不能大于 ${rule.max}`
  return '校验失败'
}

function matchesType(value: unknown, type: FormRuleType): boolean {
  switch (type) {
    case 'string':
      return typeof value === 'string'
    case 'number':
      return typeof value === 'number' && !Number.isNaN(value)
    case 'integer':
      return typeof value === 'number' && Number.isInteger(value)
    case 'boolean':
      return typeof value === 'boolean'
    case 'array':
      return Array.isArray(value)
    case 'email':
      return typeof value === 'string' && EMAIL_PATTERN.test(value)
    case 'url':
      return typeof value === 'string' && URL_PATTERN.test(value)
    default:
      return true
  }
}

function lengthOf(value: unknown): number {
  if (typeof value === 'string' || Array.isArray(value)) return value.length
  if (typeof value === 'number') return value
  return 0
}

export async function validateRule(value: unknown, rule: FormRule): Promise<FieldError | null> {
  if (rule.required && isEmpty(value)) {
    return { rule, message: rule.message ?? defaultMessage(rule) }
  }

  if (isEmpty(value) && !rule.required) {
    return null
  }

  if (rule.type && !matchesType(value, rule.type)) {
    return { rule, message: rule.message ?? defaultMessage(rule) }
  }

  if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
    return { rule, message: rule.message ?? defaultMessage(rule) }
  }

  if (typeof rule.len === 'number' && lengthOf(value) !== rule.len) {
    return { rule, message: rule.message ?? defaultMessage(rule) }
  }

  if (typeof rule.min === 'number' && lengthOf(value) < rule.min) {
    return { rule, message: rule.message ?? defaultMessage(rule) }
  }

  if (typeof rule.max === 'number' && lengthOf(value) > rule.max) {
    return { rule, message: rule.message ?? defaultMessage(rule) }
  }

  if (rule.validator) {
    const result = await rule.validator(value)
    if (result === false) {
      return { rule, message: rule.message ?? defaultMessage(rule) }
    }
    if (typeof result === 'string' && result.length > 0) {
      return { rule, message: result }
    }
  }

  return null
}

export async function validateRules(value: unknown, rules: FormRule[]): Promise<FieldError | null> {
  for (const rule of rules) {
    const error = await validateRule(value, rule)
    if (error) return error
  }
  return null
}

export function ruleTriggers(rule: FormRule): FormRuleTrigger[] {
  if (!rule.trigger) return ['change', 'blur']
  return Array.isArray(rule.trigger) ? rule.trigger : [rule.trigger]
}
