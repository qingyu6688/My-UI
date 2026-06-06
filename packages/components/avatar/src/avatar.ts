export const avatarShapes = ['circle', 'square'] as const
export const avatarSizes = ['small', 'default', 'large'] as const
export const avatarFits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const

export type AvatarShape = (typeof avatarShapes)[number]
export type AvatarSizeName = (typeof avatarSizes)[number]
export type AvatarFit = (typeof avatarFits)[number]

export interface AvatarProps {
  src?: string
  alt?: string
  shape?: AvatarShape
  size?: AvatarSizeName | number
  fit?: AvatarFit
  icon?: boolean
}

export interface AvatarEmits {
  error: [event: Event]
}
