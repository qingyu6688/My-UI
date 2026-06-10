<script setup lang="ts">
import { ref } from 'vue'

const value = ref(1)
</script>

<template>
  <my-input-number v-model="value" :min="0" :max="10" />
</template>
