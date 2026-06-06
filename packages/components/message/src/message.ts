export const messageTypes = ['info', 'success', 'warning', 'danger'] as const

export type MessageType = (typeof messageTypes)[number]

export interface MessageOptions {
  message: string
  type?: MessageType
  duration?: number
  showClose?: boolean
  center?: boolean
  grouping?: boolean
  onClose?: () => void
}

export interface MessageHandle {
  close: () => void
}

export type MessageParams = string | MessageOptions
