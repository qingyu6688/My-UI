export const linkTypes = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const
export const linkUnderlines = ['always', 'hover', 'never'] as const

export type LinkType = (typeof linkTypes)[number]
export type LinkUnderline = (typeof linkUnderlines)[number]

export interface LinkProps {
  type?: LinkType
  underline?: LinkUnderline
  disabled?: boolean
  href?: string
  target?: '_self' | '_blank' | '_parent' | '_top'
}

export interface LinkEmits {
  click: [event: MouseEvent]
}
