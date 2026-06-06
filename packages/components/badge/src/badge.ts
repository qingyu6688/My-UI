export const badgeTypes = ['primary', 'success', 'warning', 'danger', 'info'] as const

export type BadgeType = (typeof badgeTypes)[number]

export interface BadgeProps {
  value?: string | number
  max?: number
  isDot?: boolean
  hidden?: boolean
  type?: BadgeType
  showZero?: boolean
}
