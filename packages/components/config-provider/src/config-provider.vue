<script setup lang="ts">
import { provideConfig, type ConfigProviderProps } from '../../../hooks/use-config'

defineOptions({
  name: 'MyConfigProvider',
})

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  namespace: undefined,
  size: undefined,
  zIndex: undefined,
  locale: undefined,
})

provideConfig(props)
</script>

<template>
  <slot />
</template>
