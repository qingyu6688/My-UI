import { createApp, h, type App } from 'vue'
import NotificationConstructor from './notification.vue'
import type {
  NotificationHandle,
  NotificationOptions,
  NotificationParams,
  NotificationPosition,
  NotificationType,
} from './notification'

interface NotificationItem {
  id: number
  position: NotificationPosition
  app: App
  container: HTMLElement
  vm: { close: () => void } | null
}

let seed = 1
const instances: NotificationItem[] = []

function ensureWrapper(position: NotificationPosition): HTMLElement {
  const className = `my-notification-wrapper my-notification-wrapper--${position}`
  let wrapper = document.querySelector<HTMLElement>(`.my-notification-wrapper--${position}`)
  if (!wrapper) {
    wrapper = document.createElement('div')
    wrapper.className = className
    document.body.appendChild(wrapper)
  }
  return wrapper
}

function normalize(params: NotificationParams, type?: NotificationType): NotificationOptions {
  const base = typeof params === 'string' ? { message: params } : { ...params }
  if (type) base.type = type
  return base
}

function removeInstance(id: number): void {
  const index = instances.findIndex((item) => item.id === id)
  if (index === -1) return
  const [item] = instances.splice(index, 1)
  item.app.unmount()
  item.container.remove()
}

function show(params: NotificationParams, type?: NotificationType): NotificationHandle {
  const options = normalize(params, type)
  const resolved = {
    title: options.title ?? '',
    message: options.message,
    type: options.type ?? 'info',
    duration: options.duration ?? 4500,
    position: options.position ?? ('top-right' as NotificationPosition),
    showClose: options.showClose ?? true,
  }

  const id = seed++
  const container = document.createElement('div')
  container.className = 'my-notification-item'

  const app = createApp({
    render() {
      return h(NotificationConstructor, {
        ...resolved,
        onClose: () => {
          options.onClose?.()
          removeInstance(id)
        },
        onClick: () => {
          options.onClick?.()
        },
      })
    },
  })

  const vm = app.mount(container) as unknown as { close: () => void }
  const item: NotificationItem = { id, position: resolved.position, app, container, vm }
  instances.push(item)
  ensureWrapper(resolved.position).appendChild(container)

  return { close: () => vm.close() }
}

export interface NotificationFn {
  (params: NotificationParams): NotificationHandle
  success: (params: NotificationParams) => NotificationHandle
  warning: (params: NotificationParams) => NotificationHandle
  danger: (params: NotificationParams) => NotificationHandle
  info: (params: NotificationParams) => NotificationHandle
  closeAll: () => void
}

export const Notification = ((params: NotificationParams) => show(params)) as NotificationFn

Notification.success = (params) => show(params, 'success')
Notification.warning = (params) => show(params, 'warning')
Notification.danger = (params) => show(params, 'danger')
Notification.info = (params) => show(params, 'info')
Notification.closeAll = () => {
  instances.slice().forEach((item) => removeInstance(item.id))
}
