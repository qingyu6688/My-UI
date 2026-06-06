import type { PopperPlacement } from '../../../hooks/use-popper'

export const popoverTriggers = ['hover', 'click'] as const

export type PopoverTrigger = (typeof popoverTriggers)[number]

export interface PopoverProps {
  title?: string
  content?: string
  placement?: PopperPlacement
  trigger?: PopoverTrigger
  disabled?: boolean
  width?: string | number
  offset?: number
  showDelay?: number
  hideDelay?: number
}

export interface PopoverEmits {
  visibleChange: [visible: boolean]
}
