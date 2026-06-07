<script setup lang="ts">
import { reactive, ref } from 'vue'
import DemoBlock from './DemoBlock.vue'
import type { AutocompleteItem } from '../../../packages/my-ui'

const state = reactive({
  input: '',
  password: '',
  textarea: '',
  number: 1,
  radio: 'a',
  checkbox: ['a'],
  switch: true,
  select: '',
  selectMulti: [] as string[],
  slider: 40,
  rate: 3,
  color: '#a8d5ba',
  time: '',
  date: '',
  dateTime: '',
  timeSelect: '',
  cascader: [] as Array<string | number>,
  treeSelect: undefined as string | number | undefined,
  transfer: [2] as Array<string | number>,
  autocomplete: '',
  inputTag: ['Vue', 'TS'],
  otp: '',
  mention: '',
  segmented: 'list',
})

const selectOptions = [
  { value: 'design', label: '设计' },
  { value: 'frontend', label: '前端' },
  { value: 'backend', label: '后端' },
]

const cascaderOptions = [
  {
    label: '浙江',
    value: 'zj',
    children: [
      { label: '杭州', value: 'hz' },
      { label: '宁波', value: 'nb' },
    ],
  },
  { label: '北京', value: 'bj' },
]

const treeData = [
  {
    key: '1',
    label: '一级 1',
    children: [
      { key: '1-1', label: '二级 1-1' },
      { key: '1-2', label: '二级 1-2' },
    ],
  },
  { key: '2', label: '一级 2' },
]

const transferData = [
  { key: 1, label: '选项 1' },
  { key: 2, label: '选项 2' },
  { key: 3, label: '选项 3' },
  { key: 4, label: '选项 4' },
]

const mentionOptions = [
  { value: 'vue' },
  { value: 'react' },
  { value: 'svelte' },
]

const segmentedOptions = [
  { label: '列表', value: 'list' },
  { label: '看板', value: 'board' },
  { label: '日历', value: 'calendar' },
]

const fruits = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango']

function fetchSuggestions(query: string, cb: (items: AutocompleteItem[]) => void): void {
  const list = fruits
    .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    .map((value) => ({ value }))
  cb(list)
}

const formRef = ref()
const formModel = reactive({ name: '', email: '' })
const formRules = {
  name: [{ required: true, message: '请输入名称' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '邮箱格式不正确' },
  ],
}

function submitForm(): void {
  void formRef.value?.validate()
}
</script>

<template>
  <div class="demo-group">
    <DemoBlock name="Input" title="Input 输入框" description="清空、密码、前后缀与多行。">
      <my-space direction="vertical" style="width: 100%; max-width: 320px;">
        <my-input v-model="state.input" clearable placeholder="可清空输入" />
        <my-input v-model="state.password" type="password" show-password placeholder="密码输入" />
        <my-input v-model="state.textarea" type="textarea" :rows="2" placeholder="多行文本" />
      </my-space>
    </DemoBlock>

    <DemoBlock name="InputNumber" title="InputNumber 数字输入框" description="步进、范围与精度。">
      <my-input-number v-model="state.number" :min="0" :max="10" />
    </DemoBlock>

    <DemoBlock name="Radio" title="Radio 单选框" description="单选与按钮组。">
      <my-radio-group v-model="state.radio">
        <my-radio value="a">选项 A</my-radio>
        <my-radio value="b">选项 B</my-radio>
        <my-radio value="c">选项 C</my-radio>
      </my-radio-group>
    </DemoBlock>

    <DemoBlock name="Checkbox" title="Checkbox 多选框" description="多选组。">
      <my-checkbox-group v-model="state.checkbox">
        <my-checkbox value="a">苹果</my-checkbox>
        <my-checkbox value="b">香蕉</my-checkbox>
        <my-checkbox value="c">橙子</my-checkbox>
      </my-checkbox-group>
    </DemoBlock>

    <DemoBlock name="Switch" title="Switch 开关" description="状态切换。">
      <my-space align="center">
        <my-switch v-model="state.switch" />
        <my-switch v-model="state.switch" size="large" />
        <my-switch disabled />
      </my-space>
    </DemoBlock>

    <DemoBlock name="Select" title="Select 选择器" description="单选与多选。">
      <my-space wrap>
        <my-select v-model="state.select" placeholder="单选" style="width: 180px;">
          <my-option v-for="o in selectOptions" :key="o.value" :value="o.value" :label="o.label" />
        </my-select>
        <my-select v-model="state.selectMulti" multiple placeholder="多选" style="width: 220px;">
          <my-option v-for="o in selectOptions" :key="o.value" :value="o.value" :label="o.label" />
        </my-select>
      </my-space>
    </DemoBlock>

    <DemoBlock name="Slider" title="Slider 滑块" description="拖拽或键盘调整。">
      <div style="max-width: 320px;">
        <my-slider v-model="state.slider" show-stops :step="10" />
      </div>
    </DemoBlock>

    <DemoBlock name="Rate" title="Rate 评分" description="星级评分。">
      <my-rate v-model="state.rate" />
    </DemoBlock>

    <DemoBlock name="Segmented" title="Segmented 分段控制器" description="视图切换。">
      <my-segmented v-model="state.segmented" :options="segmentedOptions" />
    </DemoBlock>

    <DemoBlock name="ColorPicker" title="ColorPicker 颜色选择器" description="预设与原生取色。">
      <my-color-picker v-model="state.color" :predefine="['#a8d5ba', '#7fc7c2', '#aeb4e8', '#e5c76f']" />
    </DemoBlock>

    <DemoBlock name="TimePicker" title="TimePicker 时间选择器" description="时分秒选择。">
      <my-time-picker v-model="state.time" />
    </DemoBlock>

    <DemoBlock name="DatePicker" title="DatePicker 日期选择器" description="日历面板选择。">
      <my-date-picker v-model="state.date" clearable />
    </DemoBlock>

    <DemoBlock name="DateTimePicker" title="DateTimePicker 日期时间" description="日期 + 时间。">
      <my-date-time-picker v-model="state.dateTime" clearable />
    </DemoBlock>

    <DemoBlock name="TimeSelect" title="TimeSelect 时间选择" description="固定间隔选项。">
      <my-time-select v-model="state.timeSelect" start="09:00" end="18:00" step="00:30" />
    </DemoBlock>

    <DemoBlock name="Cascader" title="Cascader 级联选择器" description="多级联动。">
      <my-cascader v-model="state.cascader" :options="cascaderOptions" />
    </DemoBlock>

    <DemoBlock name="TreeSelect" title="TreeSelect 树形选择" description="树结构下拉选择。">
      <my-tree-select v-model="state.treeSelect" :data="treeData" default-expand-all />
    </DemoBlock>

    <DemoBlock name="Transfer" title="Transfer 穿梭框" description="双列移动选择。">
      <my-transfer v-model="state.transfer" :data="transferData" filterable />
    </DemoBlock>

    <DemoBlock name="Upload" title="Upload 上传" description="拖拽与文件列表。">
      <my-upload drag />
    </DemoBlock>

    <DemoBlock name="Autocomplete" title="Autocomplete 自动补全" description="输入联想建议。">
      <my-autocomplete
        v-model="state.autocomplete"
        :fetch-suggestions="fetchSuggestions"
        placeholder="输入水果名"
      />
    </DemoBlock>

    <DemoBlock name="InputTag" title="InputTag 标签输入" description="回车新增标签。">
      <my-input-tag v-model="state.inputTag" placeholder="输入后回车" style="max-width: 320px;" />
    </DemoBlock>

    <DemoBlock name="InputOTP" title="InputOTP 验证码输入" description="自动聚焦与粘贴。">
      <my-input-otp v-model="state.otp" :length="6" type="number" />
    </DemoBlock>

    <DemoBlock name="Mention" title="Mention 提及" description="输入 @ 触发联想。">
      <my-mention v-model="state.mention" :options="mentionOptions" placeholder="输入 @ 提及" />
    </DemoBlock>

    <DemoBlock name="Form" title="Form 表单" description="字段布局与校验。">
      <my-form ref="formRef" :model="formModel" :rules="formRules" label-width="72px" style="max-width: 360px;">
        <my-form-item label="名称" prop="name">
          <my-input v-model="formModel.name" />
        </my-form-item>
        <my-form-item label="邮箱" prop="email">
          <my-input v-model="formModel.email" />
        </my-form-item>
        <my-form-item>
          <my-button type="primary" @click="submitForm">提交</my-button>
          <my-button @click="formRef?.resetFields()">重置</my-button>
        </my-form-item>
      </my-form>
    </DemoBlock>
  </div>
</template>
