<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import type { TimelineItemProps } from './timeline'

defineOptions({
  name: 'MyTimelineItem',
})

const props = withDefaults(defineProps<TimelineItemProps>(), {
  timestamp: '',
  type: 'info',
  color: undefined,
  hollow: false,
})

const nodeStyle = computed<CSSProperties>(() => (props.color ? { borderColor: props.color, background: props.hollow ? 'transparent' : props.color } : {}))
</script>

<template>
  <li class="my-timeline-item">
    <div class="my-timeline-item__tail" />
    <div
      class="my-timeline-item__node"
      :class="[`my-timeline-item__node--${type}`, { 'is-hollow': hollow }]"
      :style="nodeStyle"
    />
    <div class="my-timeline-item__content">
      <div class="my-timeline-item__body">
        <slot />
      </div>
      <div v-if="timestamp || $slots.timestamp" class="my-timeline-item__timestamp">
        <slot name="timestamp">{{ timestamp }}</slot>
      </div>
    </div>
  </li>
</template>
