<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>(['a'])
</script>

<template>
  <my-checkbox-group v-model="value">
    <my-checkbox value="a">苹果</my-checkbox>
    <my-checkbox value="b">香蕉</my-checkbox>
    <my-checkbox value="c">橙子</my-checkbox>
  </my-checkbox-group>
</template>
