export interface AnchorLink {
  href: string
  title: string
}

export interface AnchorProps {
  links: AnchorLink[]
  offset?: number
}

export interface AnchorEmits {
  change: [href: string]
}
