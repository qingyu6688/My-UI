<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { PaginationEmits, PaginationProps } from './pagination'

defineOptions({
  name: 'MyPagination',
})

const props = withDefaults(defineProps<PaginationProps>(), {
  currentPage: 1,
  pageSize: 10,
  total: 0,
  pageSizes: () => [10, 20, 50, 100],
  pagerCount: 7,
  layout: 'prev, pager, next, jumper, ->, total',
  small: false,
  disabled: false,
  hideOnSinglePage: false,
})

const emit = defineEmits<PaginationEmits>()

const pageCount = computed(() =>
  Math.max(1, Math.ceil(props.total / Math.max(props.pageSize, 1))),
)

const layoutSections = computed(() =>
  props.layout
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean),
)

const showRoot = computed(() => !(props.hideOnSinglePage && pageCount.value <= 1))

const visiblePages = computed<number[]>(() => {
  const total = pageCount.value
  const current = props.currentPage
  const display = Math.max(props.pagerCount, 5)
  if (total <= display) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }
  const side = Math.floor((display - 3) / 2)
  if (current <= side + 2) {
    return Array.from({ length: display - 2 }, (_, index) => index + 1)
  }
  if (current >= total - side - 1) {
    return Array.from({ length: display - 2 }, (_, index) => total - (display - 3) + index)
  }
  return Array.from({ length: display - 4 }, (_, index) => current - side + index + 1)
})

const showLeftEllipsis = computed(() => visiblePages.value[0] > 2)
const showRightEllipsis = computed(
  () => visiblePages.value[visiblePages.value.length - 1] < pageCount.value - 1,
)

const jumperValue = ref(String(props.currentPage))

watch(
  () => props.currentPage,
  (value) => {
    jumperValue.value = String(value)
  },
)

function goToPage(page: number): void {
  if (props.disabled) return
  const next = Math.min(Math.max(page, 1), pageCount.value)
  if (next === props.currentPage) return
  emit('update:currentPage', next)
  emit('currentChange', next)
}

function changeSize(event: Event): void {
  const next = Number((event.target as HTMLSelectElement).value)
  emit('update:pageSize', next)
  emit('sizeChange', next)
  if (props.currentPage > Math.ceil(props.total / Math.max(next, 1))) {
    goToPage(1)
  }
}

function applyJumper(): void {
  const next = Number(jumperValue.value)
  if (!Number.isFinite(next)) {
    jumperValue.value = String(props.currentPage)
    return
  }
  goToPage(Math.trunc(next))
}
</script>

<template>
  <div
    v-if="showRoot"
    class="my-pagination"
    :class="{ 'is-small': small, 'is-disabled': disabled }"
  >
    <template v-for="(section, index) in layoutSections" :key="`${section}-${index}`">
      <div v-if="section === '->'" class="my-pagination__spacer" />

      <div v-else-if="section === 'total'" class="my-pagination__total">
        共 {{ total }} 条
      </div>

      <div v-else-if="section === 'sizes'" class="my-pagination__sizes">
        <select :value="pageSize" :disabled="disabled" @change="changeSize">
          <option v-for="size in pageSizes" :key="size" :value="size">{{ size }} 条/页</option>
        </select>
      </div>

      <button
        v-else-if="section === 'prev'"
        type="button"
        class="my-pagination__button"
        :disabled="disabled || currentPage <= 1"
        aria-label="上一页"
        @click="goToPage(currentPage - 1)"
      >
        ‹
      </button>

      <div v-else-if="section === 'pager'" class="my-pagination__pager">
        <button
          type="button"
          class="my-pagination__page"
          :class="{ 'is-active': currentPage === 1 }"
          :disabled="disabled"
          @click="goToPage(1)"
        >
          1
        </button>
        <span v-if="showLeftEllipsis" class="my-pagination__ellipsis">…</span>
        <button
          v-for="page in visiblePages"
          v-show="page !== 1 && page !== pageCount"
          :key="page"
          type="button"
          class="my-pagination__page"
          :class="{ 'is-active': currentPage === page }"
          :disabled="disabled"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        <span v-if="showRightEllipsis" class="my-pagination__ellipsis">…</span>
        <button
          v-if="pageCount > 1"
          type="button"
          class="my-pagination__page"
          :class="{ 'is-active': currentPage === pageCount }"
          :disabled="disabled"
          @click="goToPage(pageCount)"
        >
          {{ pageCount }}
        </button>
      </div>

      <button
        v-else-if="section === 'next'"
        type="button"
        class="my-pagination__button"
        :disabled="disabled || currentPage >= pageCount"
        aria-label="下一页"
        @click="goToPage(currentPage + 1)"
      >
        ›
      </button>

      <div v-else-if="section === 'jumper'" class="my-pagination__jumper">
        前往
        <input
          v-model="jumperValue"
          class="my-pagination__jumper-input"
          type="text"
          inputmode="numeric"
          :disabled="disabled"
          @change="applyJumper"
          @keydown.enter="applyJumper"
        />
        页
      </div>
    </template>
  </div>
</template>
