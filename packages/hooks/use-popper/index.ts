import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type CSSProperties,
  type Ref,
} from 'vue'
import { useZIndex } from '../use-config'

export const popperPlacements = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
] as const

export type PopperPlacement = (typeof popperPlacements)[number]

export interface UsePopperOptions {
  placement?: PopperPlacement
  offset?: number
  closeOnOutsideClick?: boolean
  closeOnEscape?: boolean
}

export interface UsePopperReturn {
  visible: Ref<boolean>
  triggerRef: Ref<HTMLElement | null>
  popperRef: Ref<HTMLElement | null>
  popperStyle: Ref<CSSProperties>
  open: () => void
  close: () => void
  toggle: () => void
  update: () => void
}

function computePosition(
  trigger: DOMRect,
  popper: { width: number; height: number },
  placement: PopperPlacement,
  offset: number,
): { top: number; left: number } {
  const [side, align = 'center'] = placement.split('-') as [string, string?]
  let top = 0
  let left = 0

  switch (side) {
    case 'top':
      top = trigger.top - popper.height - offset
      break
    case 'bottom':
      top = trigger.bottom + offset
      break
    case 'left':
      left = trigger.left - popper.width - offset
      break
    case 'right':
      left = trigger.right + offset
      break
  }

  if (side === 'top' || side === 'bottom') {
    if (align === 'start') left = trigger.left
    else if (align === 'end') left = trigger.right - popper.width
    else left = trigger.left + (trigger.width - popper.width) / 2
  } else {
    if (align === 'start') top = trigger.top
    else if (align === 'end') top = trigger.bottom - popper.height
    else top = trigger.top + (trigger.height - popper.height) / 2
  }

  return {
    top: top + window.scrollY,
    left: left + window.scrollX,
  }
}

export function usePopper(options: UsePopperOptions = {}): UsePopperReturn {
  const {
    placement = 'bottom',
    offset = 8,
    closeOnOutsideClick = true,
    closeOnEscape = true,
  } = options

  const visible = ref(false)
  const triggerRef = ref<HTMLElement | null>(null)
  const popperRef = ref<HTMLElement | null>(null)
  const position = ref({ top: 0, left: 0 })

  const { currentZIndex } = useZIndex()

  const popperStyle = computed<CSSProperties>(() => ({
    position: 'absolute',
    top: `${position.value.top}px`,
    left: `${position.value.left}px`,
    // 继承 ConfigProvider 的 zIndex 基准（默认 2000），让全局调整能生效
    zIndex: currentZIndex.value,
  }))

  function update(): void {
    if (!visible.value || !triggerRef.value || !popperRef.value) return
    const triggerRect = triggerRef.value.getBoundingClientRect()
    const popperRect = popperRef.value.getBoundingClientRect()
    position.value = computePosition(
      triggerRect,
      { width: popperRect.width, height: popperRect.height },
      placement,
      offset,
    )
  }

  function open(): void {
    if (visible.value) return
    visible.value = true
  }

  function close(): void {
    if (!visible.value) return
    visible.value = false
  }

  function toggle(): void {
    if (visible.value) {
      close()
      return
    }

    open()
  }

  watch(visible, async (next) => {
    if (next) {
      await Promise.resolve()
      update()
    }
  })

  function handleOutsideClick(event: MouseEvent): void {
    if (!visible.value || !closeOnOutsideClick) return
    const target = event.target as Node
    if (triggerRef.value?.contains(target) || popperRef.value?.contains(target)) return
    close()
  }

  function handleEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape' && visible.value && closeOnEscape) {
      close()
    }
  }

  function handleScrollOrResize(): void {
    if (visible.value) update()
  }

  onMounted(() => {
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    window.addEventListener('resize', handleScrollOrResize)
    window.addEventListener('scroll', handleScrollOrResize, true)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleOutsideClick)
    document.removeEventListener('keydown', handleEscape)
    window.removeEventListener('resize', handleScrollOrResize)
    window.removeEventListener('scroll', handleScrollOrResize, true)
  })

  return {
    visible,
    triggerRef,
    popperRef,
    popperStyle,
    open,
    close,
    toggle,
    update,
  }
}
