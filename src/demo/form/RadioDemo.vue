<script setup lang="ts">
import { ref } from 'vue'

const value = ref('a')
</script>

<template>
  <my-radio-group v-model="value">
    <my-radio value="a">选项 A</my-radio>
    <my-radio value="b">选项 B</my-radio>
    <my-radio value="c">选项 C</my-radio>
  </my-radio-group>
</template>
