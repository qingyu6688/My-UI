<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, type CSSProperties } from 'vue'

defineOptions({
  name: 'MyAffix',
})

const props = withDefaults(defineProps<{ offset?: number; position?: 'top' | 'bottom' }>(), {
  offset: 0,
  position: 'top',
})

const emit = defineEmits<{ change: [fixed: boolean] }>()

const rootRef = ref<HTMLElement | null>(null)
const fixed = ref(false)
const style = ref<CSSProperties>({})
const placeholderStyle = ref<CSSProperties>({})

function update(): void {
  const el = rootRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const shouldFix =
    props.position === 'top'
      ? rect.top < props.offset
      : rect.bottom > window.innerHeight - props.offset

  if (shouldFix !== fixed.value) {
    fixed.value = shouldFix
    emit('change', shouldFix)
  }

  if (shouldFix) {
    placeholderStyle.value = { width: `${rect.width}px`, height: `${rect.height}px` }
    style.value = {
      position: 'fixed',
      [props.position]: `${props.offset}px`,
      width: `${rect.width}px`,
      zIndex: 1000,
    }
  } else {
    placeholderStyle.value = {}
    style.value = {}
  }
}

onMounted(() => {
  window.addEventListener('scroll', update)
  window.addEventListener('resize', update)
  update()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <div ref="rootRef" class="my-affix">
    <div :style="placeholderStyle">
      <div :class="{ 'is-fixed': fixed }" :style="style">
        <slot />
      </div>
    </div>
  </div>
</template>
