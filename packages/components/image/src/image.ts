export const imageFits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const

export type ImageFit = (typeof imageFits)[number]

export interface ImageProps {
  src: string
  alt?: string
  fit?: ImageFit
  lazy?: boolean
  width?: string | number
  height?: string | number
}

export interface ImageEmits {
  load: [event: Event]
  error: [event: Event]
}
