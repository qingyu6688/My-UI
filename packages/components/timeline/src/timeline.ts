export const timelineNodeTypes = ['primary', 'success', 'warning', 'danger', 'info'] as const

export type TimelineNodeType = (typeof timelineNodeTypes)[number]

export interface TimelineItemProps {
  timestamp?: string
  type?: TimelineNodeType
  color?: string
  hollow?: boolean
}
