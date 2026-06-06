export const alertTypes = ['info', 'success', 'warning', 'danger'] as const
export const alertEffects = ['light', 'dark'] as const

export type AlertType = (typeof alertTypes)[number]
export type AlertEffect = (typeof alertEffects)[number]

export interface AlertProps {
  type?: AlertType
  title?: string
  description?: string
  closable?: boolean
  closeText?: string
  showIcon?: boolean
  center?: boolean
  effect?: AlertEffect
}

export interface AlertEmits {
  close: [event: MouseEvent]
}
