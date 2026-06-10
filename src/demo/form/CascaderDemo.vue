<script setup lang="ts">
import { ref } from 'vue'

const value = ref<Array<string | number>>([])

const options = [
  {
    label: '浙江',
    value: 'zj',
    children: [
      { label: '杭州', value: 'hz' },
      { label: '宁波', value: 'nb' },
    ],
  },
  { label: '北京', value: 'bj' },
]
</script>

<template>
  <my-cascader v-model="value" :options="options" />
</template>
