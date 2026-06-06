<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import type { MessageBoxAction, MessageBoxOptions } from './message-box'

defineOptions({
  name: 'MyMessageBox',
})

const props = withDefaults(defineProps<MessageBoxOptions>(), {
  title: '提示',
  message: '',
  type: 'alert',
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  showCancelButton: undefined,
  showClose: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  center: false,
  inputValue: '',
  inputPlaceholder: '',
  inputType: 'text',
  inputPattern: undefined,
  inputValidator: undefined,
  inputErrorMessage: '',
})

const emit = defineEmits<{
  action: [action: MessageBoxAction, value: string]
  destroy: []
}>()

const visible = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const inputModel = ref(props.inputValue)
const errorText = ref('')

const isPrompt = computed(() => props.type === 'prompt')
const showCancel = computed(() =>
  props.showCancelButton ?? (props.type === 'confirm' || props.type === 'prompt'),
)

function validateInput(): boolean {
  if (!isPrompt.value) return true
  const value = inputModel.value

  if (props.inputPattern && !props.inputPattern.test(value)) {
    errorText.value = props.inputErrorMessage || '输入格式不正确'
    return false
  }
  if (props.inputValidator) {
    const result = props.inputValidator(value)
    if (result === false) {
      errorText.value = props.inputErrorMessage || '输入不合法'
      return false
    }
    if (typeof result === 'string') {
      errorText.value = result
      return false
    }
  }
  errorText.value = ''
  return true
}

function emitAction(action: MessageBoxAction): void {
  if (action === 'confirm' && !validateInput()) {
    return
  }
  const done = (): void => {
    visible.value = false
    emit('action', action, inputModel.value)
  }
  if (props.beforeClose) {
    props.beforeClose(action, done)
    return
  }
  done()
}

function handleModalClick(): void {
  if (props.closeOnClickModal) emitAction('close')
}

function handleEscape(event: KeyboardEvent): void {
  if (event.key === 'Escape' && props.closeOnPressEscape && visible.value) {
    emitAction('close')
  }
}

function handleEnter(): void {
  if (isPrompt.value) emitAction('confirm')
}

onMounted(() => {
  visible.value = true
  document.addEventListener('keydown', handleEscape)
  if (isPrompt.value) {
    void nextTick(() => inputRef.value?.focus())
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape)
})

defineExpose({ close: () => emitAction('close') })
</script>

<template>
  <Teleport to="body">
    <transition name="my-message-box-fade" @after-leave="emit('destroy')">
      <div
        v-show="visible"
        class="my-message-box__wrapper"
        @click.self="handleModalClick"
      >
        <div
          class="my-message-box"
          :class="{ 'is-center': center }"
          role="dialog"
          aria-modal="true"
        >
          <header class="my-message-box__header">
            <span class="my-message-box__title">{{ title }}</span>
            <button
              v-if="showClose"
              type="button"
              class="my-message-box__close"
              aria-label="关闭"
              @click="emitAction('close')"
            >
              ×
            </button>
          </header>
          <div class="my-message-box__body">
            <p v-if="message" class="my-message-box__message">{{ message }}</p>
            <div v-if="isPrompt" class="my-message-box__input">
              <input
                ref="inputRef"
                v-model="inputModel"
                :type="inputType"
                :placeholder="inputPlaceholder"
                :class="{ 'is-error': errorText }"
                @keydown.enter="handleEnter"
              />
              <p v-if="errorText" class="my-message-box__error">{{ errorText }}</p>
            </div>
          </div>
          <footer class="my-message-box__footer">
            <button
              v-if="showCancel"
              type="button"
              class="my-message-box__btn"
              @click="emitAction('cancel')"
            >
              {{ cancelButtonText }}
            </button>
            <button
              type="button"
              class="my-message-box__btn is-primary"
              @click="emitAction('confirm')"
            >
              {{ confirmButtonText }}
            </button>
          </footer>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
