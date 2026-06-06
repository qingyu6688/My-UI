import { createApp, h, ref, type App } from 'vue'
import LoadingSpinner from './loading-spinner.vue'
import type { LoadingInstance, LoadingOptions } from './loading'

function resolveTarget(target: LoadingOptions['target']): HTMLElement {
  if (typeof target === 'string') {
    return document.querySelector<HTMLElement>(target) ?? document.body
  }
  return target ?? document.body
}

export function createLoading(options: LoadingOptions = {}): LoadingInstance {
  const fullscreen = options.fullscreen ?? !options.target
  const target = fullscreen ? document.body : resolveTarget(options.target)

  const text = ref(options.text ?? '')

  const container = document.createElement('div')
  container.className = 'my-loading-container'
  if (options.customClass) {
    container.classList.add(options.customClass)
  }

  // 非全屏时需要相对定位承载遮罩
  const originalPosition = target.style.position
  if (!fullscreen) {
    const computed = window.getComputedStyle(target).position
    if (computed === 'static' || computed === '') {
      target.style.position = 'relative'
    }
  }

  if (options.lock !== false && fullscreen) {
    document.body.style.overflow = 'hidden'
  }

  const app: App = createApp({
    render() {
      return h(LoadingSpinner, {
        text: text.value,
        background: options.background,
        fullscreen,
      })
    },
  })

  app.mount(container)
  target.appendChild(container)

  let closed = false

  function close(): void {
    if (closed) return
    closed = true
    app.unmount()
    container.remove()
    if (!fullscreen) {
      target.style.position = originalPosition
    }
    if (options.lock !== false && fullscreen) {
      document.body.style.overflow = ''
    }
  }

  function setText(value: string): void {
    text.value = value
  }

  return { close, setText }
}
