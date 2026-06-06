export const tagTypes = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const
export const tagSizes = ['small', 'default', 'large'] as const
export const tagEffects = ['light', 'plain', 'dark'] as const

export type TagType = (typeof tagTypes)[number]
export type TagSize = (typeof tagSizes)[number]
export type TagEffect = (typeof tagEffects)[number]

export interface TagProps {
  type?: TagType
  size?: TagSize
  effect?: TagEffect
  closable?: boolean
  round?: boolean
  disableTransitions?: boolean
}

export interface TagEmits {
  close: [event: MouseEvent]
  click: [event: MouseEvent]
}
