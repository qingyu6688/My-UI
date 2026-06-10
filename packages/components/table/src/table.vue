<script setup lang="ts">
import { computed, nextTick, provide, ref, type CSSProperties } from 'vue'
import { usePopper } from '../../../hooks/use-popper'
import { useSize } from '../../../hooks/use-config'
import {
  tableContextKey,
  type TableColumnState,
  type TableEmits,
  type TableProps,
  type TableRow,
  type TableSortOrder,
} from './table'

defineOptions({
  name: 'MyTable',
})

const props = withDefaults(defineProps<TableProps>(), {
  stripe: false,
  border: false,
  size: undefined,
  emptyText: '暂无数据',
  loading: false,
  rowKey: undefined,
  modelValue: () => [],
  defaultSort: undefined,
  height: undefined,
})

const emit = defineEmits<TableEmits>()

const actualSize = useSize(props)
const columns = ref<TableColumnState[]>([])

function registerColumn(column: TableColumnState): void {
  const existing = columns.value.findIndex((item) => item.id === column.id)
  if (existing === -1) {
    columns.value = [...columns.value, column]
  } else {
    const next = [...columns.value]
    next[existing] = column
    columns.value = next
  }
}

function unregisterColumn(id: string): void {
  columns.value = columns.value.filter((column) => column.id !== id)
}

provide(tableContextKey, { registerColumn, unregisterColumn })

/* ---------- 排序 ---------- */
const sortState = ref<{ prop: string; order: TableSortOrder }>({
  prop: props.defaultSort?.prop ?? '',
  order: props.defaultSort?.order ?? null,
})

/* ---------- 筛选 ---------- */
const SELECTION_WIDTH = 48
const DEFAULT_COL_WIDTH = 100

// 每列已应用的筛选值，key 为 column.id
const filterState = ref<Record<string, unknown[]>>({})

const {
  visible: filterVisible,
  triggerRef: filterTriggerRef,
  popperRef: filterPopperRef,
  popperStyle: filterPopperStyle,
  open: openFilterPopper,
  close: closeFilterPopper,
  update: updateFilterPopper,
} = usePopper({ placement: 'bottom-start', offset: 4 })
const activeFilter = ref<TableColumnState | null>(null)
const draftFilter = ref<unknown[]>([])

function setFilterPopperEl(el: unknown): void {
  filterPopperRef.value = (el as HTMLElement) ?? null
}

function isFiltered(column: TableColumnState): boolean {
  return (filterState.value[column.id]?.length ?? 0) > 0
}

function toggleFilter(column: TableColumnState, event: MouseEvent): void {
  event.stopPropagation()
  if (filterVisible.value && activeFilter.value?.id === column.id) {
    closeFilterPopper()
    return
  }
  filterTriggerRef.value = event.currentTarget as HTMLElement
  activeFilter.value = column
  draftFilter.value = [...(filterState.value[column.id] ?? [])]
  openFilterPopper()
  void nextTick(() => updateFilterPopper())
}

function isDraftChecked(value: unknown): boolean {
  return draftFilter.value.includes(value)
}

function pickFilter(value: unknown): void {
  const column = activeFilter.value
  if (!column) return
  if (column.filterMultiple) {
    const index = draftFilter.value.indexOf(value)
    if (index === -1) {
      draftFilter.value = [...draftFilter.value, value]
    } else {
      draftFilter.value = draftFilter.value.filter((item) => item !== value)
    }
  } else {
    // 单选：立即应用
    draftFilter.value = [value]
    applyFilter()
  }
}

function commitFilter(values: unknown[]): void {
  const column = activeFilter.value
  if (!column) return
  const next = { ...filterState.value }
  if (values.length === 0) {
    delete next[column.id]
  } else {
    next[column.id] = [...values]
  }
  filterState.value = next
  emit('filterChange', filterState.value)
  closeFilterPopper()
}

function applyFilter(): void {
  commitFilter(draftFilter.value)
}

function resetFilter(): void {
  draftFilter.value = []
  commitFilter([])
}

/* ---------- 数据处理：先筛选再排序 ---------- */
const filteredData = computed<TableRow[]>(() =>
  props.data.filter((row) =>
    columns.value.every((column) => {
      const selected = filterState.value[column.id]
      if (!selected || selected.length === 0) return true
      const method =
        column.filterMethod ??
        ((value: unknown, target: TableRow) =>
          column.prop ? target[column.prop] === value : true)
      return selected.some((value) => method(value, row))
    }),
  ),
)

const sortedData = computed<TableRow[]>(() => {
  if (!sortState.value.prop || !sortState.value.order) return filteredData.value
  const { prop, order } = sortState.value
  const cloned = [...filteredData.value]
  cloned.sort((a, b) => {
    const av = a[prop]
    const bv = b[prop]
    if (av === bv) return 0
    if (av === null || av === undefined) return 1
    if (bv === null || bv === undefined) return -1
    if (typeof av === 'number' && typeof bv === 'number') {
      return order === 'asc' ? av - bv : bv - av
    }
    const as = String(av)
    const bs = String(bv)
    return order === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as)
  })
  return cloned
})

/* ---------- 选择 ---------- */
const selectedRows = computed(() => props.modelValue ?? [])

function getRowKey(row: TableRow, index: number): string {
  if (props.rowKey && row[props.rowKey] !== undefined) {
    return String(row[props.rowKey])
  }
  return String(index)
}

function isRowSelected(row: TableRow): boolean {
  if (!props.rowKey) {
    return selectedRows.value.includes(row)
  }
  const key = row[props.rowKey]
  return selectedRows.value.some((item) => item[props.rowKey as string] === key)
}

function toggleRow(row: TableRow): void {
  const next = isRowSelected(row)
    ? selectedRows.value.filter((item) => {
        if (!props.rowKey) return item !== row
        return item[props.rowKey] !== row[props.rowKey]
      })
    : [...selectedRows.value, row]
  emit('update:modelValue', next)
  emit('selectionChange', next)
}

const allSelected = computed(
  () => sortedData.value.length > 0 && sortedData.value.every((row) => isRowSelected(row)),
)

const someSelected = computed(
  () => sortedData.value.some((row) => isRowSelected(row)) && !allSelected.value,
)

function toggleAll(): void {
  const next = allSelected.value ? [] : [...sortedData.value]
  emit('update:modelValue', next)
  emit('selectionChange', next)
}

function handleSort(column: TableColumnState): void {
  if (!column.sortable || !column.prop) return
  const order: TableSortOrder =
    sortState.value.prop === column.prop
      ? sortState.value.order === 'asc'
        ? 'desc'
        : sortState.value.order === 'desc'
          ? null
          : 'asc'
      : 'asc'
  sortState.value = { prop: column.prop, order }
  emit('sortChange', { prop: column.prop, order })
}

function handleRowClick(row: TableRow, index: number, event: MouseEvent): void {
  emit('rowClick', row, index, event)
}

/* ---------- 固定列 ---------- */
const leftFixedColumns = computed(() => columns.value.filter((c) => c.fixed === 'left'))
const rightFixedColumns = computed(() => columns.value.filter((c) => c.fixed === 'right'))
const hasLeftFixed = computed(() => leftFixedColumns.value.length > 0)
const hasRightFixed = computed(() => rightFixedColumns.value.length > 0)

function colWidth(column: TableColumnState): number {
  if (typeof column.width === 'number') return column.width
  if (typeof column.width === 'string') {
    const parsed = Number.parseInt(column.width, 10)
    if (!Number.isNaN(parsed)) return parsed
  }
  return DEFAULT_COL_WIDTH
}

function fixedCellStyle(column: TableColumnState): CSSProperties {
  if (column.fixed === 'left') {
    let offset = props.selectable && hasLeftFixed.value ? SELECTION_WIDTH : 0
    for (const c of leftFixedColumns.value) {
      if (c.id === column.id) break
      offset += colWidth(c)
    }
    return { position: 'sticky', left: `${offset}px`, zIndex: 2 }
  }
  if (column.fixed === 'right') {
    let offset = 0
    for (const c of [...rightFixedColumns.value].reverse()) {
      if (c.id === column.id) break
      offset += colWidth(c)
    }
    return { position: 'sticky', right: `${offset}px`, zIndex: 2 }
  }
  return {}
}

function fixedCellClass(column: TableColumnState): Record<string, boolean> {
  const leftList = leftFixedColumns.value
  const rightList = rightFixedColumns.value
  return {
    'is-fixed-left': column.fixed === 'left',
    'is-fixed-right': column.fixed === 'right',
    'is-fixed-left-last': column.fixed === 'left' && leftList[leftList.length - 1]?.id === column.id,
    'is-fixed-right-first': column.fixed === 'right' && rightList[0]?.id === column.id,
  }
}

const selectionFixedStyle = computed<CSSProperties>(() =>
  hasLeftFixed.value ? { position: 'sticky', left: '0px', zIndex: 2 } : {},
)

const tableStyle = computed<CSSProperties>(() => {
  if (props.height === undefined) return {}
  const height = typeof props.height === 'number' ? `${props.height}px` : props.height
  return { maxHeight: height, overflowY: 'auto' }
})
</script>

<template>
  <div
    class="my-table"
    :class="[
      `my-table--${actualSize}`,
      {
        'is-bordered': border,
        'is-striped': stripe,
        'is-loading': loading,
        'has-fixed-left': hasLeftFixed,
        'has-fixed-right': hasRightFixed,
      },
    ]"
    :style="tableStyle"
  >
    <div class="my-table__slots" hidden>
      <slot />
    </div>

    <table>
      <colgroup>
        <col v-if="selectable" style="width: 48px;" />
        <col
          v-for="column in columns"
          :key="column.id"
          :style="column.width ? { width: typeof column.width === 'number' ? `${column.width}px` : column.width } : undefined"
        />
      </colgroup>
      <thead>
        <tr>
          <th
            v-if="selectable"
            class="my-table__cell my-table__cell--selection"
            :class="{ 'is-fixed-left': hasLeftFixed }"
            :style="selectionFixedStyle"
          >
            <input
              type="checkbox"
              :checked="allSelected"
              :indeterminate.prop="someSelected"
              aria-label="全选"
              @change="toggleAll"
            />
          </th>
          <th
            v-for="column in columns"
            :key="column.id"
            class="my-table__cell"
            :class="[
              `is-${column.align}`,
              fixedCellClass(column),
              {
                'is-sortable': column.sortable,
                'is-sort-asc': sortState.prop === column.prop && sortState.order === 'asc',
                'is-sort-desc': sortState.prop === column.prop && sortState.order === 'desc',
              },
            ]"
            :style="fixedCellStyle(column)"
            @click="handleSort(column)"
          >
            <span class="my-table__head-content">
              <component :is="column.headerRender" v-if="column.headerRender" :column="column" />
              <template v-else>{{ column.label }}</template>
              <span v-if="column.sortable" class="my-table__sort" aria-hidden="true">
                <span class="my-table__sort-arrow my-table__sort-arrow--up">▲</span>
                <span class="my-table__sort-arrow my-table__sort-arrow--down">▼</span>
              </span>
              <button
                v-if="column.filters"
                type="button"
                class="my-table__filter-trigger"
                :class="{ 'is-active': isFiltered(column) }"
                aria-label="筛选"
                @click="toggleFilter(column, $event)"
              >
                ⌄
              </button>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="sortedData.length === 0">
          <td :colspan="(selectable ? 1 : 0) + columns.length" class="my-table__empty">
            <slot name="empty">{{ emptyText }}</slot>
          </td>
        </tr>
        <tr
          v-for="(row, index) in sortedData"
          v-else
          :key="getRowKey(row, index)"
          class="my-table__row"
          :class="{ 'is-selected': isRowSelected(row) }"
          @click="handleRowClick(row, index, $event)"
        >
          <td
            v-if="selectable"
            class="my-table__cell my-table__cell--selection"
            :class="{ 'is-fixed-left': hasLeftFixed }"
            :style="selectionFixedStyle"
          >
            <input
              type="checkbox"
              :checked="isRowSelected(row)"
              :aria-label="`选择第 ${index + 1} 行`"
              @change="toggleRow(row)"
              @click.stop
            />
          </td>
          <td
            v-for="column in columns"
            :key="column.id"
            class="my-table__cell"
            :class="[`is-${column.align}`, fixedCellClass(column)]"
            :style="fixedCellStyle(column)"
          >
            <component
              :is="column.cellRender"
              v-if="column.cellRender"
              :row="row"
              :$index="index"
            />
            <template v-else>
              {{ column.prop ? row[column.prop] : '' }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="loading" class="my-table__loading" aria-hidden="true">
      <span class="my-table__spinner" />
    </div>

    <Teleport to="body">
      <div
        v-show="filterVisible"
        :ref="setFilterPopperEl"
        class="my-table__filter-panel"
        :style="filterPopperStyle"
        role="menu"
      >
        <ul class="my-table__filter-list">
          <li
            v-for="option in activeFilter?.filters ?? []"
            :key="String(option.value)"
            class="my-table__filter-option"
            :class="{ 'is-active': isDraftChecked(option.value) }"
            @click="pickFilter(option.value)"
          >
            <span v-if="activeFilter?.filterMultiple" class="my-table__filter-check">
              {{ isDraftChecked(option.value) ? '☑' : '☐' }}
            </span>
            {{ option.text }}
          </li>
        </ul>
        <div v-if="activeFilter?.filterMultiple" class="my-table__filter-actions">
          <button type="button" class="my-table__filter-btn" @click="resetFilter">重置</button>
          <button
            type="button"
            class="my-table__filter-btn is-primary"
            @click="applyFilter"
          >
            确定
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
