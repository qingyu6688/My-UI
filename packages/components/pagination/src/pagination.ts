export const paginationLayouts = [
  'total',
  'sizes',
  'prev',
  'pager',
  'next',
  'jumper',
] as const

export type PaginationLayoutItem = (typeof paginationLayouts)[number]

export interface PaginationProps {
  currentPage?: number
  pageSize?: number
  total?: number
  pageSizes?: number[]
  pagerCount?: number
  layout?: string
  small?: boolean
  disabled?: boolean
  hideOnSinglePage?: boolean
}

export interface PaginationEmits {
  'update:currentPage': [page: number]
  'update:pageSize': [size: number]
  currentChange: [page: number]
  sizeChange: [size: number]
}
