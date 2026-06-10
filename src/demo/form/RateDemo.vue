<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3)
</script>

<template>
  <my-rate v-model="value" />
</template>
