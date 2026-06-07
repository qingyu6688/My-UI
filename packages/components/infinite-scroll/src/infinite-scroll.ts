import type { Directive, DirectiveBinding } from 'vue'

interface InfiniteScrollEl extends HTMLElement {
  __infiniteScroll?: {
    handler: () => void
    container: HTMLElement
  }
}

function getScrollContainer(el: HTMLElement): HTMLElement {
  let parent: HTMLElement | null = el
  while (parent) {
    const overflow = window.getComputedStyle(parent).overflowY
    if (overflow === 'auto' || overflow === 'scroll') return parent
    parent = parent.parentElement
  }
  return document.documentElement
}

export const vInfiniteScroll: Directive<InfiniteScrollEl, () => void> = {
  mounted(el, binding: DirectiveBinding<() => void>) {
    const container = getScrollContainer(el)
    // 触底距离通过 data-distance 配置，默认 50px
    const distance = Number(el.dataset.distance ?? 0) || 50

    const handler = (): void => {
      if (el.dataset.disabled === 'true') return
      const { scrollTop, scrollHeight, clientHeight } = container
      if (scrollHeight - scrollTop - clientHeight <= distance) {
        binding.value?.()
      }
    }

    container.addEventListener('scroll', handler)
    el.__infiniteScroll = { handler, container }
  },
  unmounted(el) {
    if (el.__infiniteScroll) {
      el.__infiniteScroll.container.removeEventListener('scroll', el.__infiniteScroll.handler)
      el.__infiniteScroll = undefined
    }
  },
}
