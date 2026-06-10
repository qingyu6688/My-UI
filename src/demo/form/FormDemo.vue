<script setup lang="ts">
import { reactive, ref } from 'vue'

const formRef = ref()
const model = reactive({ name: '', email: '' })
const rules = {
  name: [{ required: true, message: '请输入名称' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email' as const, message: '邮箱格式不正确' },
  ],
}

function submit(): void {
  void formRef.value?.validate()
}
</script>

<template>
  <my-form
    ref="formRef"
    :model="model"
    :rules="rules"
    label-width="72px"
    style="max-width: 360px;"
  >
    <my-form-item label="名称" prop="name">
      <my-input v-model="model.name" />
    </my-form-item>
    <my-form-item label="邮箱" prop="email">
      <my-input v-model="model.email" />
    </my-form-item>
    <my-form-item>
      <my-button type="primary" @click="submit">提交</my-button>
      <my-button @click="formRef?.resetFields()">重置</my-button>
    </my-form-item>
  </my-form>
</template>
