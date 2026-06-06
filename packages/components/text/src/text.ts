export const textTypes = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const
export const textSizes = ['small', 'default', 'large'] as const

export type TextType = (typeof textTypes)[number]
export type TextSize = (typeof textSizes)[number]

export interface TextProps {
  type?: TextType
  size?: TextSize
  tag?: string
  truncated?: boolean
  lineClamp?: number
  mark?: boolean
}
