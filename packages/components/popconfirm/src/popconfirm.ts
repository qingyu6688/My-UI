import type { PopperPlacement } from '../../../hooks/use-popper'

export interface PopconfirmProps {
  title?: string
  confirmButtonText?: string
  cancelButtonText?: string
  placement?: PopperPlacement
  disabled?: boolean
  width?: string | number
  icon?: string
  hideIcon?: boolean
}

export interface PopconfirmEmits {
  confirm: [event: MouseEvent]
  cancel: [event: MouseEvent]
}
