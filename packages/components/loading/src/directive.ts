import type { Directive, DirectiveBinding } from 'vue'
import { createLoading } from './service'
import type { LoadingBindingValue, LoadingInstance } from './loading'

interface LoadingElement extends HTMLElement {
  __loadingInstance?: LoadingInstance | null
}

function normalize(binding: DirectiveBinding<boolean | LoadingBindingValue>): {
  visible: boolean
  text?: string
  background?: string
} {
  const value = binding.value
  if (typeof value === 'boolean') {
    return { visible: value }
  }
  return {
    visible: Boolean(value?.loading),
    text: value?.text,
    background: value?.background,
  }
}

function toggle(el: LoadingElement, binding: DirectiveBinding<boolean | LoadingBindingValue>): void {
  const { visible, text, background } = normalize(binding)
  const fullscreen = binding.modifiers.fullscreen ?? false
  const lock = binding.modifiers.lock ?? false

  if (visible) {
    if (!el.__loadingInstance) {
      el.__loadingInstance = createLoading({
        target: fullscreen ? undefined : el,
        fullscreen,
        lock,
        text,
        background,
      })
    } else {
      el.__loadingInstance.setText(text ?? '')
    }
  } else if (el.__loadingInstance) {
    el.__loadingInstance.close()
    el.__loadingInstance = null
  }
}

export const vLoading: Directive<LoadingElement, boolean | LoadingBindingValue> = {
  mounted(el, binding) {
    toggle(el, binding)
  },
  updated(el, binding) {
    toggle(el, binding)
  },
  unmounted(el) {
    el.__loadingInstance?.close()
    el.__loadingInstance = null
  },
}
