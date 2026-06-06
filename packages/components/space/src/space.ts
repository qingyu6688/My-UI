export const spaceDirections = ['horizontal', 'vertical'] as const
export const spaceSizes = ['small', 'default', 'large'] as const
export const spaceAligns = ['start', 'center', 'end', 'baseline', 'stretch'] as const

export type SpaceDirection = (typeof spaceDirections)[number]
export type SpaceSizeName = (typeof spaceSizes)[number]
export type SpaceAlign = (typeof spaceAligns)[number]

export type SpaceSize = SpaceSizeName | number | [number, number]

export interface SpaceProps {
  direction?: SpaceDirection
  size?: SpaceSize
  wrap?: boolean
  align?: SpaceAlign
  fill?: boolean
}
