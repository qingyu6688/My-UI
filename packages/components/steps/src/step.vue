<script setup lang="ts">
import { computed, getCurrentInstance, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { stepsKey, type StepProps, type StepStatus } from './steps'

defineOptions({
  name: 'MyStep',
})

const props = withDefaults(defineProps<StepProps>(), {
  title: '',
  description: '',
  status: undefined,
})

const steps = inject(stepsKey)
const uid = getCurrentInstance()?.uid ?? 0
const index = ref(0)

onMounted(() => {
  if (steps) index.value = steps.registerStep(uid)
})

onBeforeUnmount(() => {
  steps?.unregisterStep(uid)
})

const status = computed<StepStatus>(() => {
  if (props.status) return props.status
  const active = steps?.active.value ?? 0
  if (index.value < active) return 'finish'
  if (index.value === active) return 'process'
  return 'wait'
})

const isLast = computed(() => index.value === (steps?.total.value ?? 1) - 1)
const iconText = computed(() => (status.value === 'finish' ? '✓' : status.value === 'error' ? '!' : String(index.value + 1)))
</script>

<template>
  <div class="my-step" :class="[`is-${status}`, { 'is-last': isLast }]">
    <div class="my-step__head">
      <span class="my-step__icon">{{ iconText }}</span>
      <span v-if="!isLast" class="my-step__line" aria-hidden="true" />
    </div>
    <div class="my-step__main">
      <div class="my-step__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.description" class="my-step__description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>
