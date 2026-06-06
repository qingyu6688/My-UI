import { createApp, h, ref, type App, type Ref } from 'vue'
import MessageConstructor from './message.vue'
import {
  type MessageHandle,
  type MessageOptions,
  type MessageParams,
  type MessageType,
} from './message'

interface MessageItem {
  id: number
  options: Required<Pick<MessageOptions, 'message' | 'type' | 'duration' | 'showClose' | 'center'>>
  repeat: Ref<number>
  app: App
  container: HTMLElement
  vm: { close: () => void } | null
}

let seed = 1
const instances: MessageItem[] = []
const GAP = 16

function ensureWrapper(): HTMLElement {
  let wrapper = document.querySelector<HTMLElement>('.my-message-wrapper')
  if (!wrapper) {
    wrapper = document.createElement('div')
    wrapper.className = 'my-message-wrapper'
    document.body.appendChild(wrapper)
  }
  return wrapper
}

function normalize(params: MessageParams, type?: MessageType): MessageOptions {
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

function show(params: MessageParams, type?: MessageType): MessageHandle {
  const options = normalize(params, type)
  const resolved = {
    message: options.message,
    type: options.type ?? 'info',
    duration: options.duration ?? 3000,
    showClose: options.showClose ?? false,
    center: options.center ?? false,
  }

  // 合并重复消息
  if (options.grouping) {
    const existing = instances.find(
      (item) => item.options.message === resolved.message && item.options.type === resolved.type,
    )
    if (existing) {
      existing.repeat.value += 1
      return { close: () => existing.vm?.close() }
    }
  }

  const id = seed++
  const repeat = ref(1)
  const container = document.createElement('div')
  container.className = 'my-message-item'

  const app = createApp({
    render() {
      return h(MessageConstructor, {
        message: resolved.message,
        type: resolved.type,
        duration: resolved.duration,
        showClose: resolved.showClose,
        center: resolved.center,
        repeat: repeat.value,
        onClose: () => {
          options.onClose?.()
          removeInstance(id)
        },
      })
    },
  })

  const vm = app.mount(container) as unknown as { close: () => void }

  const item: MessageItem = {
    id,
    options: resolved,
    repeat,
    app,
    container,
    vm,
  }
  instances.push(item)
  ensureWrapper().appendChild(container)

  return { close: () => vm.close() }
}

export interface MessageFn {
  (params: MessageParams): MessageHandle
  success: (params: MessageParams) => MessageHandle
  warning: (params: MessageParams) => MessageHandle
  danger: (params: MessageParams) => MessageHandle
  info: (params: MessageParams) => MessageHandle
  closeAll: () => void
}

export const Message = ((params: MessageParams) => show(params)) as MessageFn

Message.success = (params) => show(params, 'success')
Message.warning = (params) => show(params, 'warning')
Message.danger = (params) => show(params, 'danger')
Message.info = (params) => show(params, 'info')
Message.closeAll = () => {
  // 同步移除所有实例，不等待离场过渡（过渡在无 DOM 环境下不会触发 afterLeave）
  instances.slice().forEach((item) => removeInstance(item.id))
}

// 测试辅助
export { GAP }
