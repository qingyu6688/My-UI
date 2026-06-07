import type { InjectionKey, Ref } from 'vue'

export interface CarouselContext {
  register: (uid: number) => void
  unregister: (uid: number) => void
  activeIndex: Ref<number>
  items: Ref<number[]>
}

export const carouselKey: InjectionKey<CarouselContext> = Symbol('MyCarousel')

export interface CarouselProps {
  modelValue?: number
  autoplay?: boolean
  interval?: number
  arrow?: 'always' | 'hover' | 'never'
  indicator?: boolean
  loop?: boolean
  height?: string
}

export interface CarouselEmits {
  'update:modelValue': [index: number]
  change: [current: number, prev: number]
}
