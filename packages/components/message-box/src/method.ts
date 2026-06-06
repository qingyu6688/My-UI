import { createApp, h, type App } from 'vue'
import MessageBoxConstructor from './message-box.vue'
import type {
  MessageBoxAction,
  MessageBoxOptions,
  MessageBoxResult,
  MessageBoxType,
} from './message-box'

function normalize(
  params: string | MessageBoxOptions,
  type: MessageBoxType,
): MessageBoxOptions {
  const base = typeof params === 'string' ? { message: params } : { ...params }
  base.type = base.type ?? type
  return base
}

function instantiate(
  options: MessageBoxOptions,
): Promise<MessageBoxResult> {
  return new Promise<MessageBoxResult>((resolve, reject) => {
    const container = document.createElement('div')
    let settled = false

    const app: App = createApp({
      render() {
        return h(MessageBoxConstructor, {
          ...options,
          onAction: (action: MessageBoxAction, value: string) => {
            if (settled) return
            settled = true
            if (action === 'confirm') {
              resolve({ action, value })
            } else {
              // confirm 走 resolve，cancel/close 走 reject，便于 try/catch 写法
              reject({ action, value } as MessageBoxResult)
            }
          },
          onDestroy: () => {
            app.unmount()
            container.remove()
          },
        })
      },
    })

    app.mount(container)
    document.body.appendChild(container)
  })
}

export interface MessageBoxFn {
  (params: string | MessageBoxOptions): Promise<MessageBoxResult>
  alert: (message: string, title?: string, options?: MessageBoxOptions) => Promise<MessageBoxResult>
  confirm: (message: string, title?: string, options?: MessageBoxOptions) => Promise<MessageBoxResult>
  prompt: (message: string, title?: string, options?: MessageBoxOptions) => Promise<MessageBoxResult>
}

export const MessageBox = ((params: string | MessageBoxOptions) =>
  instantiate(normalize(params, 'confirm'))) as MessageBoxFn

MessageBox.alert = (message, title, options = {}) =>
  instantiate({ ...options, message, title: title ?? options.title, type: 'alert' })

MessageBox.confirm = (message, title, options = {}) =>
  instantiate({ ...options, message, title: title ?? options.title, type: 'confirm' })

MessageBox.prompt = (message, title, options = {}) =>
  instantiate({ ...options, message, title: title ?? options.title, type: 'prompt' })
