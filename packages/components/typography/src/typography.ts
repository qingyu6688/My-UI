export const titleLevels = [1, 2, 3, 4, 5] as const

export type TitleLevel = (typeof titleLevels)[number]

export interface TitleProps {
  level?: TitleLevel
  bold?: boolean
}

export interface ParagraphProps {
  spacing?: 'default' | 'relaxed' | 'compact'
}
