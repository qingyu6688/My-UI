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
  text?: boolean
}

export interface ButtonEmits {
  click: [event: MouseEvent]
}

