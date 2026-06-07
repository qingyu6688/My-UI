<script setup lang="ts">
import { ref } from 'vue'
import { MyButton } from '../../button'
import type { UploadEmits, UploadFile, UploadProps } from './upload'

defineOptions({
  name: 'MyUpload',
})

const props = withDefaults(defineProps<UploadProps>(), {
  modelValue: () => [],
  accept: '',
  multiple: false,
  disabled: false,
  drag: false,
  limit: undefined,
  autoUpload: true,
  action: '',
  showFileList: true,
})

const emit = defineEmits<UploadEmits>()

const inputRef = ref<HTMLInputElement | null>(null)
const isDragOver = ref(false)
let uidSeed = 1

function openFileDialog(): void {
  if (props.disabled) return
  inputRef.value?.click()
}

function addFiles(fileList: FileList | File[]): void {
  const incoming = Array.from(fileList)
  const current = props.modelValue ?? []

  if (props.limit !== undefined && current.length + incoming.length > props.limit) {
    emit('exceed', incoming)
    return
  }

  const next = [...current]
  for (const raw of incoming) {
    const file: UploadFile = {
      uid: uidSeed++,
      name: raw.name,
      size: raw.size,
      status: 'ready',
      percentage: 0,
      raw,
    }
    next.push(file)
    emit('change', file, next)
  }
  emit('update:modelValue', next)
}

function onInputChange(event: Event): void {
  const target = event.target as HTMLInputElement
  if (target.files) addFiles(target.files)
  target.value = ''
}

function onDrop(event: DragEvent): void {
  isDragOver.value = false
  if (props.disabled || !props.drag) return
  if (event.dataTransfer?.files) addFiles(event.dataTransfer.files)
}

function removeFile(file: UploadFile): void {
  const next = (props.modelValue ?? []).filter((item) => item.uid !== file.uid)
  emit('update:modelValue', next)
  emit('remove', file)
}
</script>

<template>
  <div class="my-upload" :class="{ 'is-disabled': disabled }">
    <input
      ref="inputRef"
      type="file"
      class="my-upload__input"
      :accept="accept"
      :multiple="multiple"
      @change="onInputChange"
    />

    <div
      v-if="drag"
      class="my-upload__dragger"
      :class="{ 'is-dragover': isDragOver }"
      @click="openFileDialog"
      @drop.prevent="onDrop"
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
    >
      <slot name="dragger">
        <p class="my-upload__dragger-text">将文件拖到此处，或<em>点击上传</em></p>
      </slot>
    </div>
    <div v-else class="my-upload__trigger" @click="openFileDialog">
      <slot>
        <my-button type="primary">选择文件</my-button>
      </slot>
    </div>

    <ul v-if="showFileList && modelValue.length" class="my-upload__list">
      <li v-for="file in modelValue" :key="file.uid" class="my-upload__item" :class="`is-${file.status}`">
        <span class="my-upload__item-name">{{ file.name }}</span>
        <button type="button" class="my-upload__item-remove" aria-label="移除" @click="removeFile(file)">
          ×
        </button>
      </li>
    </ul>
  </div>
</template>
