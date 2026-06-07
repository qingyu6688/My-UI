<script setup lang="ts">
import { computed } from 'vue'
import type { StatisticProps } from './statistic'

defineOptions({
  name: 'MyStatistic',
})

const props = withDefaults(defineProps<StatisticProps>(), {
  value: 0,
  title: '',
  precision: undefined,
  prefix: '',
  suffix: '',
  groupSeparator: ',',
})

const displayValue = computed(() => {
  const num = typeof props.precision === 'number' ? props.value.toFixed(props.precision) : String(props.value)
  const [intPart, decPart] = num.split('.')
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, props.groupSeparator)
  return decPart ? `${grouped}.${decPart}` : grouped
})
</script>

<template>
  <div class="my-statistic">
    <div v-if="title || $slots.title" class="my-statistic__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="my-statistic__content">
      <span v-if="prefix || $slots.prefix" class="my-statistic__prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <span class="my-statistic__value">{{ displayValue }}</span>
      <span v-if="suffix || $slots.suffix" class="my-statistic__suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>
  </div>
</template>
