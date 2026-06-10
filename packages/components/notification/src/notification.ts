export const notificationTypes = ['info', 'success', 'warning', 'danger'] as const
export const notificationPositions = [
  'top-right',
  'top-left',
  'bottom-right',
  'bottom-left',
] as const

export type NotificationType = (typeof notificationTypes)[number]
export type NotificationPosition = (typeof notificationPositions)[number]

export interface NotificationOptions {
  title?: string
  message: string
  type?: NotificationType
  duration?: number
  position?: NotificationPosition
  showClose?: boolean
  onClose?: () => void
  onClick?: () => void
}

export interface NotificationHandle {
  close: () => void
}

export type NotificationParams = string | NotificationOptions
