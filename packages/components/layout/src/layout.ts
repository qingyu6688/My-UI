import type { InjectionKey, Ref } from 'vue'

export const rowJustify = ['start', 'end', 'center', 'space-around', 'space-between'] as const
export const rowAlign = ['top', 'middle', 'bottom'] as const

export type RowJustify = (typeof rowJustify)[number]
export type RowAlign = (typeof rowAlign)[number]

export interface RowContext {
  gutter: Ref<number>
}

export const rowContextKey: InjectionKey<RowContext> = Symbol('MyRow')

export interface RowProps {
  gutter?: number
  justify?: RowJustify
  align?: RowAlign
  tag?: string
}

export interface ColProps {
  span?: number
  offset?: number
  push?: number
  pull?: number
  tag?: string
}
