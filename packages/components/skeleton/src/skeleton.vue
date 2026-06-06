<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'MySkeleton',
})

const props = withDefaults(
  defineProps<{
    rows?: number
    animated?: boolean
    loading?: boolean
    avatar?: boolean
  }>(),
  {
    rows: 3,
    animated: true,
    loading: true,
    avatar: false,
  },
)

const rowList = computed(() => Array.from({ length: Math.max(props.rows, 1) }, (_, i) => i))
</script>

<template>
  <div v-if="loading" class="my-skeleton" :class="{ 'is-animated': animated }" aria-busy="true">
    <div v-if="avatar" class="my-skeleton__avatar" />
    <div class="my-skeleton__content">
      <div
        v-for="row in rowList"
        :key="row"
        class="my-skeleton__row"
        :style="{ width: row === rowList.length - 1 ? '60%' : '100%' }"
      />
    </div>
  </div>
  <slot v-else />
</template>
