import type { InjectionKey, Ref } from 'vue'

export const buttonTypes = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const
export const buttonSizes = ['small', 'default', 'large'] as const
export const nativeButtonTypes = ['button', 'submit', 'reset'] as const

export type ButtonType = (typeof buttonTypes)[number]
export type ButtonSize = (typeof buttonSizes)[number]
export type NativeButtonType = (typeof nativeButtonTypes)[number]

export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  nativeType?: NativeButtonType
  disabled?: boolean
  loading?: boolean
  plain?: boolean
  round?: boolean
  /** 圆形按钮（常配单图标） */
  circle?: boolean
  /** 虚线边框 */
  dashed?: boolean
  /** 文字按钮（无边框、无背景） */
  text?: boolean
  /** 文字按钮带浅色背景（需 text=true） */
  bg?: boolean
  /** 链接按钮（无内边距，有下划线） */
  link?: boolean
  /** 自定义颜色（自动派生 hover / active / 浅色变体） */
  color?: string
  /** 渲染的 HTML 标签（默认 button） */
  tag?: string
  /** 自动在两个中文字符之间插入空格 */
  autoInsertSpace?: boolean
  /** 自动聚焦 */
  autofocus?: boolean
}

export interface ButtonEmits {
  click: [event: MouseEvent]
}

/** ButtonGroup provide 给子 Button：统一 type / size */
export interface ButtonGroupContext {
  type: Ref<ButtonType | undefined>
  size: Ref<ButtonSize | undefined>
}

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol('MyButtonGroup')

export interface ButtonGroupProps {
  type?: ButtonType
  size?: ButtonSize
  direction?: 'horizontal' | 'vertical'
}
