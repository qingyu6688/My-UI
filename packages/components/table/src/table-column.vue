<script setup lang="ts">
import {
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  useSlots,
  watch,
} from 'vue'
import {
  tableContextKey,
  type TableColumnProps,
  type TableColumnState,
  type TableFixed,
} from './table'

defineOptions({
  name: 'MyTableColumn',
})

const props = withDefaults(defineProps<TableColumnProps>(), {
  prop: undefined,
  label: '',
  width: undefined,
  align: 'left',
  sortable: false,
  fixed: undefined,
  filters: undefined,
  filterMultiple: true,
  filterMethod: undefined,
})

const slots = useSlots()
const table = inject(tableContextKey)
const id = `column-${getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2)}`

function resolveFixed(): TableFixed | undefined {
  if (props.fixed === true) return 'left'
  if (props.fixed === false || props.fixed === undefined) return undefined
  return props.fixed
}

function snapshot(): TableColumnState {
  return {
    id,
    prop: props.prop,
    label: props.label,
    width: props.width,
    align: props.align,
    sortable: props.sortable,
    fixed: resolveFixed(),
    filters: props.filters,
    filterMultiple: props.filterMultiple,
    filterMethod: props.filterMethod,
    cellRender: slots.default,
    headerRender: slots.header,
  }
}

onMounted(() => {
  table?.registerColumn(snapshot())
})

watch(
  () => [props.prop, props.label, props.width, props.align, props.sortable, props.fixed] as const,
  () => {
    table?.registerColumn(snapshot())
  },
)

onBeforeUnmount(() => {
  table?.unregisterColumn(id)
})
</script>

<template>
  <span />
</template>
