import type { InjectionKey, Slot } from 'vue'

export const tableAligns = ['left', 'center', 'right'] as const

export type TableAlign = (typeof tableAligns)[number]
export type TableSortOrder = 'asc' | 'desc' | null
export type TableRow = Record<string, unknown>
export type TableFixed = 'left' | 'right'

export interface TableFilterOption {
  text: string
  value: unknown
}

export type TableFilterMethod = (value: unknown, row: TableRow) => boolean

export interface TableColumnState {
  id: string
  prop?: string
  label: string
  width?: string | number
  align: TableAlign
  sortable: boolean
  fixed?: TableFixed
  filters?: TableFilterOption[]
  filterMultiple: boolean
  filterMethod?: TableFilterMethod
  cellRender?: Slot
  headerRender?: Slot
}

export interface TableContext {
  registerColumn: (column: TableColumnState) => void
  unregisterColumn: (id: string) => void
}

export const tableContextKey: InjectionKey<TableContext> = Symbol('MyTable')

export interface TableProps {
  data: TableRow[]
  stripe?: boolean
  border?: boolean
  size?: 'small' | 'default' | 'large'
  emptyText?: string
  loading?: boolean
  rowKey?: string
  selectable?: boolean
  modelValue?: TableRow[]
  defaultSort?: { prop: string; order: TableSortOrder }
  height?: string | number
}

export interface TableEmits {
  'update:modelValue': [rows: TableRow[]]
  selectionChange: [rows: TableRow[]]
  sortChange: [sort: { prop: string; order: TableSortOrder }]
  filterChange: [filters: Record<string, unknown[]>]
  rowClick: [row: TableRow, index: number, event: MouseEvent]
}

export interface TableColumnProps {
  prop?: string
  label?: string
  width?: string | number
  align?: TableAlign
  sortable?: boolean
  fixed?: TableFixed | boolean
  filters?: TableFilterOption[]
  filterMultiple?: boolean
  filterMethod?: TableFilterMethod
}
