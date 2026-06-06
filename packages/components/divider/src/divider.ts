export const dividerDirections = ['horizontal', 'vertical'] as const
export const dividerBorderStyles = ['solid', 'dashed', 'dotted'] as const
export const dividerContentPositions = ['left', 'center', 'right'] as const

export type DividerDirection = (typeof dividerDirections)[number]
export type DividerBorderStyle = (typeof dividerBorderStyles)[number]
export type DividerContentPosition = (typeof dividerContentPositions)[number]

export interface DividerProps {
  direction?: DividerDirection
  borderStyle?: DividerBorderStyle
  contentPosition?: DividerContentPosition
}
