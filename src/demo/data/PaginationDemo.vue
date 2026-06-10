<script setup lang="ts">
import { ref } from 'vue'

const page = ref(1)
const size = ref(10)
</script>

<template>
  <my-pagination
    v-model:current-page="page"
    v-model:page-size="size"
    :total="200"
  />
</template>
