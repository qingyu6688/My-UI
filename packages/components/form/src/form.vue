<script setup lang="ts">
import { provide, reactive, toRef } from 'vue'
import {
  formContextKey,
  type FormEmits,
  type FormExposes,
  type FormItemContext,
  type FormProps,
} from './form'

defineOptions({
  name: 'MyForm',
})

const props = withDefaults(defineProps<FormProps>(), {
  model: undefined,
  rules: undefined,
  size: 'default',
  labelPosition: 'right',
  labelWidth: undefined,
  disabled: false,
  hideRequiredAsterisk: false,
  showMessage: true,
  scrollToError: false,
})

defineEmits<FormEmits>()

const fields = reactive(new Set<FormItemContext>())

provide(formContextKey, {
  model: toRef(props, 'model'),
  rules: toRef(props, 'rules'),
  size: toRef(props, 'size'),
  labelPosition: toRef(props, 'labelPosition'),
  labelWidth: toRef(props, 'labelWidth'),
  disabled: toRef(props, 'disabled'),
  hideRequiredAsterisk: toRef(props, 'hideRequiredAsterisk'),
  showMessage: toRef(props, 'showMessage'),
  registerField: (field) => {
    fields.add(field)
  },
  unregisterField: (field) => {
    fields.delete(field)
  },
})

async function validate(): Promise<boolean> {
  const results = await Promise.all(Array.from(fields).map((field) => field.validate()))
  const valid = results.every(Boolean)

  if (!valid && props.scrollToError) {
    const failingField = Array.from(fields).find((field, index) => !results[index])
    failingField?.rootEl()?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return valid
}

async function validateField(prop: string | string[]): Promise<boolean> {
  const props_ = Array.isArray(prop) ? prop : [prop]
  const targets = Array.from(fields).filter((field) => field.prop && props_.includes(field.prop))
  const results = await Promise.all(targets.map((field) => field.validate()))
  return results.every(Boolean)
}

function resetFields(): void {
  fields.forEach((field) => field.resetField())
}

function clearValidate(prop?: string | string[]): void {
  if (!prop) {
    fields.forEach((field) => field.clearValidate())
    return
  }
  const props_ = Array.isArray(prop) ? prop : [prop]
  fields.forEach((field) => {
    if (field.prop && props_.includes(field.prop)) {
      field.clearValidate()
    }
  })
}

function scrollToField(prop: string): void {
  const target = Array.from(fields).find((field) => field.prop === prop)
  target?.rootEl()?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

defineExpose<FormExposes>({
  validate,
  validateField,
  resetFields,
  clearValidate,
  scrollToField,
})

defineSlots<{ default(): unknown }>()
</script>

<template>
  <form
    class="my-form"
    :class="[
      `my-form--${size}`,
      `my-form--label-${labelPosition}`,
      {
        'is-disabled': disabled,
      },
    ]"
    @submit.prevent
  >
    <slot />
  </form>
</template>
