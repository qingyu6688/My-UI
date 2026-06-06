<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import {
  formContextKey,
  formItemContextKey,
  type FormItemContext,
  type FormItemProps,
} from './form'
import {
  ruleTriggers,
  validateRules,
  type FormRule,
  type FormRuleTrigger,
} from '../../../utils/validator'

defineOptions({
  name: 'MyFormItem',
})

const props = withDefaults(defineProps<FormItemProps>(), {
  prop: undefined,
  label: '',
  labelWidth: undefined,
  required: false,
  rules: undefined,
  showMessage: true,
  error: undefined,
})

const form = inject(formContextKey, undefined)

const rootRef = ref<HTMLElement | null>(null)
const validateState = ref<'' | 'success' | 'error' | 'validating'>('')
const validateMessage = ref('')
const initialValue = ref<unknown>(undefined)

const fieldValue = computed(() => {
  if (!form?.model.value || !props.prop) return undefined
  return form.model.value[props.prop]
})

const mergedRules = computed<FormRule[]>(() => {
  const collected: FormRule[] = []
  const own = props.rules
  if (own) {
    collected.push(...(Array.isArray(own) ? own : [own]))
  }
  if (form?.rules.value && props.prop) {
    const fromForm = form.rules.value[props.prop]
    if (fromForm) {
      collected.push(...(Array.isArray(fromForm) ? fromForm : [fromForm]))
    }
  }
  if (props.required && !collected.some((rule) => rule.required)) {
    collected.unshift({ required: true })
  }
  return collected
})

const isRequired = computed(
  () => props.required || mergedRules.value.some((rule) => rule.required),
)

const labelWidth = computed(() => {
  const own = props.labelWidth ?? form?.labelWidth.value
  if (own === undefined) return undefined
  return typeof own === 'number' ? `${own}px` : own
})

const effectiveShowMessage = computed(() =>
  props.showMessage && (form?.showMessage.value ?? true),
)

const labelPosition = computed(() => form?.labelPosition.value ?? 'right')

async function validate(trigger?: FormRuleTrigger): Promise<boolean> {
  if (!props.prop || mergedRules.value.length === 0) {
    validateState.value = ''
    validateMessage.value = ''
    return true
  }

  const rules = trigger
    ? mergedRules.value.filter((rule) => ruleTriggers(rule).includes(trigger))
    : mergedRules.value

  if (rules.length === 0) return true

  validateState.value = 'validating'
  const error = await validateRules(fieldValue.value, rules)
  if (error) {
    validateState.value = 'error'
    validateMessage.value = error.message
    return false
  }

  validateState.value = 'success'
  validateMessage.value = ''
  return true
}

function resetField(): void {
  if (form?.model.value && props.prop) {
    form.model.value[props.prop] = initialValue.value
  }
  clearValidate()
}

function clearValidate(): void {
  validateState.value = ''
  validateMessage.value = ''
}

watch(
  fieldValue,
  () => {
    if (validateState.value !== '') {
      void validate('change')
    }
  },
)

watch(
  () => props.error,
  (value) => {
    if (value) {
      validateState.value = 'error'
      validateMessage.value = value
    } else if (validateState.value === 'error') {
      clearValidate()
    }
  },
  { immediate: true },
)

const context: FormItemContext = {
  get prop() {
    return props.prop
  },
  validate,
  resetField,
  clearValidate,
  rootEl: () => rootRef.value,
}

provide(formItemContextKey, context)

onMounted(() => {
  if (props.prop && form?.model.value) {
    initialValue.value = form.model.value[props.prop]
  }
  form?.registerField(context)
})

onBeforeUnmount(() => {
  form?.unregisterField(context)
})

function onBlur(): void {
  void validate('blur')
}

defineExpose({ validate, resetField, clearValidate })
</script>

<template>
  <div
    ref="rootRef"
    class="my-form-item"
    :class="[
      `my-form-item--label-${labelPosition}`,
      {
        'is-required': isRequired,
        'is-error': validateState === 'error',
        'is-success': validateState === 'success',
      },
    ]"
    @blur.capture="onBlur"
  >
    <label
      v-if="label || $slots.label"
      class="my-form-item__label"
      :style="labelWidth ? { width: labelWidth } : undefined"
    >
      <span v-if="isRequired && !form?.hideRequiredAsterisk.value" class="my-form-item__required" aria-hidden="true">*</span>
      <slot name="label">{{ label }}</slot>
    </label>
    <div class="my-form-item__content">
      <slot />
      <div v-if="effectiveShowMessage && validateMessage" class="my-form-item__error">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>
