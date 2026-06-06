<script setup lang="ts">
import { computed, provide, ref, toRef } from 'vue'
import { stepsKey, type StepsProps } from './steps'

defineOptions({
  name: 'MySteps',
})

const props = withDefaults(defineProps<StepsProps>(), {
  active: 0,
  direction: 'horizontal',
})

const uids = ref<number[]>([])

provide(stepsKey, {
  active: toRef(props, 'active'),
  direction: toRef(props, 'direction'),
  total: computed(() => uids.value.length),
  registerStep: (uid: number) => {
    if (!uids.value.includes(uid)) {
      uids.value = [...uids.value, uid]
    }
    return uids.value.indexOf(uid)
  },
  unregisterStep: (uid: number) => {
    uids.value = uids.value.filter((item) => item !== uid)
  },
})
</script>

<template>
  <div class="my-steps" :class="`my-steps--${direction}`">
    <slot />
  </div>
</template>
