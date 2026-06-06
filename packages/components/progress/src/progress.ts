export const progressTypes = ['line', 'circle'] as const
export const progressStatuses = ['success', 'warning', 'danger'] as const

export type ProgressType = (typeof progressTypes)[number]
export type ProgressStatus = (typeof progressStatuses)[number]

export interface ProgressProps {
  percentage: number
  type?: ProgressType
  strokeWidth?: number
  status?: ProgressStatus
  showText?: boolean
  textInside?: boolean
  width?: number
  color?: string
}
