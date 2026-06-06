import type { PopperPlacement } from '../../../hooks/use-popper'

export const tooltipTriggers = ['hover', 'click', 'focus'] as const

export type TooltipTrigger = (typeof tooltipTriggers)[number]

export interface TooltipProps {
  content?: string
  placement?: PopperPlacement
  trigger?: TooltipTrigger
  disabled?: boolean
  showDelay?: number
  hideDelay?: number
  offset?: number
  effect?: 'dark' | 'light'
}

export interface TooltipEmits {
  visibleChange: [visible: boolean]
}
