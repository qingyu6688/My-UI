<script setup lang="ts">
import { ref } from 'vue'

const value = ref('#a8d5ba')
</script>

<template>
  <my-color-picker
    v-model="value"
    :predefine="['#a8d5ba', '#7fc7c2', '#aeb4e8', '#e5c76f']"
  />
</template>
