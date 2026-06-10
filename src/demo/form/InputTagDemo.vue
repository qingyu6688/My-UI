<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['Vue', 'TS'])
</script>

<template>
  <my-input-tag
    v-model="value"
    placeholder="输入后回车"
    style="max-width: 320px;"
  />
</template>
