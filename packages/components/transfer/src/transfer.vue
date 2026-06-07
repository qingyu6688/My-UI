<script setup lang="ts">
import { computed, ref } from 'vue'
import { MyButton } from '../../button'
import type { TransferEmits, TransferItem, TransferProps } from './transfer'

defineOptions({
  name: 'MyTransfer',
})

const props = withDefaults(defineProps<TransferProps>(), {
  modelValue: () => [],
  titles: () => ['列表 1', '列表 2'],
  filterable: false,
  disabled: false,
})

const emit = defineEmits<TransferEmits>()

type Key = string | number

const leftChecked = ref<Key[]>([])
const rightChecked = ref<Key[]>([])
const leftQuery = ref('')
const rightQuery = ref('')

const rightKeys = computed(() => new Set(props.modelValue ?? []))

const leftItems = computed(() =>
  props.data.filter(
    (item) =>
      !rightKeys.value.has(item.key) &&
      item.label.toLowerCase().includes(leftQuery.value.toLowerCase()),
  ),
)
const rightItems = computed(() =>
  props.data.filter(
    (item) =>
      rightKeys.value.has(item.key) &&
      item.label.toLowerCase().includes(rightQuery.value.toLowerCase()),
  ),
)

function toggleCheck(side: 'left' | 'right', item: TransferItem): void {
  if (item.disabled || props.disabled) return
  const target = side === 'left' ? leftChecked : rightChecked
  const index = target.value.indexOf(item.key)
  if (index === -1) target.value = [...target.value, item.key]
  else target.value = target.value.filter((key) => key !== item.key)
}

function moveToRight(): void {
  const next = [...(props.modelValue ?? []), ...leftChecked.value]
  emit('update:modelValue', next)
  emit('change', next)
  leftChecked.value = []
}

function moveToLeft(): void {
  const removing = new Set(rightChecked.value)
  const next = (props.modelValue ?? []).filter((key) => !removing.has(key))
  emit('update:modelValue', next)
  emit('change', next)
  rightChecked.value = []
}
</script>

<template>
  <div class="my-transfer" :class="{ 'is-disabled': disabled }">
    <div class="my-transfer__panel">
      <div class="my-transfer__header">
        {{ titles[0] }}
        <span class="my-transfer__count">{{ leftItems.length }}</span>
      </div>
      <input
        v-if="filterable"
        v-model="leftQuery"
        class="my-transfer__filter"
        placeholder="搜索"
      />
      <ul class="my-transfer__list">
        <li
          v-for="item in leftItems"
          :key="item.key"
          class="my-transfer__item"
          :class="{ 'is-checked': leftChecked.includes(item.key), 'is-disabled': item.disabled }"
          @click="toggleCheck('left', item)"
        >
          <span class="my-transfer__check">{{ leftChecked.includes(item.key) ? '☑' : '☐' }}</span>
          {{ item.label }}
        </li>
      </ul>
    </div>

    <div class="my-transfer__actions">
      <my-button
        size="small"
        type="primary"
        :disabled="leftChecked.length === 0"
        @click="moveToRight"
      >
        ›
      </my-button>
      <my-button
        size="small"
        type="primary"
        :disabled="rightChecked.length === 0"
        @click="moveToLeft"
      >
        ‹
      </my-button>
    </div>

    <div class="my-transfer__panel">
      <div class="my-transfer__header">
        {{ titles[1] }}
        <span class="my-transfer__count">{{ rightItems.length }}</span>
      </div>
      <input
        v-if="filterable"
        v-model="rightQuery"
        class="my-transfer__filter"
        placeholder="搜索"
      />
      <ul class="my-transfer__list">
        <li
          v-for="item in rightItems"
          :key="item.key"
          class="my-transfer__item"
          :class="{ 'is-checked': rightChecked.includes(item.key), 'is-disabled': item.disabled }"
          @click="toggleCheck('right', item)"
        >
          <span class="my-transfer__check">{{ rightChecked.includes(item.key) ? '☑' : '☐' }}</span>
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>
