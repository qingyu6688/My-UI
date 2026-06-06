import type { CSSProperties } from 'vue'

export const cardShadows = ['always', 'hover', 'never'] as const

export type CardShadow = (typeof cardShadows)[number]

export interface CardProps {
  header?: string
  shadow?: CardShadow
  bodyStyle?: CSSProperties
}
