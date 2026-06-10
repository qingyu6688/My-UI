<script setup lang="ts">
import DemoBox from './DemoBox.vue'
import InputDemo from '../../demo/form/InputDemo.vue'
import InputSrc from '../../demo/form/InputDemo.vue?raw'
import InputNumberDemo from '../../demo/form/InputNumberDemo.vue'
import InputNumberSrc from '../../demo/form/InputNumberDemo.vue?raw'
import RadioDemo from '../../demo/form/RadioDemo.vue'
import RadioSrc from '../../demo/form/RadioDemo.vue?raw'
import CheckboxDemo from '../../demo/form/CheckboxDemo.vue'
import CheckboxSrc from '../../demo/form/CheckboxDemo.vue?raw'
import SwitchDemo from '../../demo/form/SwitchDemo.vue'
import SwitchSrc from '../../demo/form/SwitchDemo.vue?raw'
import SelectDemo from '../../demo/form/SelectDemo.vue'
import SelectSrc from '../../demo/form/SelectDemo.vue?raw'
import SliderDemo from '../../demo/form/SliderDemo.vue'
import SliderSrc from '../../demo/form/SliderDemo.vue?raw'
import RateDemo from '../../demo/form/RateDemo.vue'
import RateSrc from '../../demo/form/RateDemo.vue?raw'
import SegmentedDemo from '../../demo/form/SegmentedDemo.vue'
import SegmentedSrc from '../../demo/form/SegmentedDemo.vue?raw'
import ColorPickerDemo from '../../demo/form/ColorPickerDemo.vue'
import ColorPickerSrc from '../../demo/form/ColorPickerDemo.vue?raw'
import TimePickerDemo from '../../demo/form/TimePickerDemo.vue'
import TimePickerSrc from '../../demo/form/TimePickerDemo.vue?raw'
import DatePickerDemo from '../../demo/form/DatePickerDemo.vue'
import DatePickerSrc from '../../demo/form/DatePickerDemo.vue?raw'
import DateTimePickerDemo from '../../demo/form/DateTimePickerDemo.vue'
import DateTimePickerSrc from '../../demo/form/DateTimePickerDemo.vue?raw'
import TimeSelectDemo from '../../demo/form/TimeSelectDemo.vue'
import TimeSelectSrc from '../../demo/form/TimeSelectDemo.vue?raw'
import CascaderDemo from '../../demo/form/CascaderDemo.vue'
import CascaderSrc from '../../demo/form/CascaderDemo.vue?raw'
import TreeSelectDemo from '../../demo/form/TreeSelectDemo.vue'
import TreeSelectSrc from '../../demo/form/TreeSelectDemo.vue?raw'
import TransferDemo from '../../demo/form/TransferDemo.vue'
import TransferSrc from '../../demo/form/TransferDemo.vue?raw'
import UploadDemo from '../../demo/form/UploadDemo.vue'
import UploadSrc from '../../demo/form/UploadDemo.vue?raw'
import AutocompleteDemo from '../../demo/form/AutocompleteDemo.vue'
import AutocompleteSrc from '../../demo/form/AutocompleteDemo.vue?raw'
import InputTagDemo from '../../demo/form/InputTagDemo.vue'
import InputTagSrc from '../../demo/form/InputTagDemo.vue?raw'
import InputOTPDemo from '../../demo/form/InputOTPDemo.vue'
import InputOTPSrc from '../../demo/form/InputOTPDemo.vue?raw'
import MentionDemo from '../../demo/form/MentionDemo.vue'
import MentionSrc from '../../demo/form/MentionDemo.vue?raw'
import FormDemo from '../../demo/form/FormDemo.vue'
import FormSrc from '../../demo/form/FormDemo.vue?raw'
</script>

<template>
  <div class="demo-group">
    <DemoBox
      name="Input" title="Input 输入框" title-en="Input"
      description="清空、密码、前后缀与多行。" description-en="Clearable, password, prefix and textarea."
      :source="InputSrc" path="src/demo/form/InputDemo.vue"
    >
      <InputDemo />
    </DemoBox>

    <DemoBox
      name="InputNumber" title="InputNumber 数字输入框" title-en="InputNumber"
      description="步进、范围与精度。" description-en="Stepper with range and precision."
      :source="InputNumberSrc" path="src/demo/form/InputNumberDemo.vue"
    >
      <InputNumberDemo />
    </DemoBox>

    <DemoBox
      name="Radio" title="Radio 单选框" title-en="Radio"
      description="单选与按钮组。" description-en="Single and button group."
      :source="RadioSrc" path="src/demo/form/RadioDemo.vue"
    >
      <RadioDemo />
    </DemoBox>

    <DemoBox
      name="Checkbox" title="Checkbox 多选框" title-en="Checkbox"
      description="多选组。" description-en="Checkbox group."
      :source="CheckboxSrc" path="src/demo/form/CheckboxDemo.vue"
    >
      <CheckboxDemo />
    </DemoBox>

    <DemoBox
      name="Switch" title="Switch 开关" title-en="Switch"
      description="状态切换。" description-en="Toggle state."
      :source="SwitchSrc" path="src/demo/form/SwitchDemo.vue"
    >
      <SwitchDemo />
    </DemoBox>

    <DemoBox
      name="Select" title="Select 选择器" title-en="Select"
      description="单选与多选。" description-en="Single and multiple."
      :source="SelectSrc" path="src/demo/form/SelectDemo.vue"
    >
      <SelectDemo />
    </DemoBox>

    <DemoBox
      name="Slider" title="Slider 滑块" title-en="Slider"
      description="拖拽或键盘调整。" description-en="Drag or keyboard adjust."
      :source="SliderSrc" path="src/demo/form/SliderDemo.vue"
    >
      <SliderDemo />
    </DemoBox>

    <DemoBox
      name="Rate" title="Rate 评分" title-en="Rate"
      description="星级评分。" description-en="Star rating."
      :source="RateSrc" path="src/demo/form/RateDemo.vue"
    >
      <RateDemo />
    </DemoBox>

    <DemoBox
      name="Segmented" title="Segmented 分段控制器" title-en="Segmented"
      description="视图切换。" description-en="View switch."
      :source="SegmentedSrc" path="src/demo/form/SegmentedDemo.vue"
    >
      <SegmentedDemo />
    </DemoBox>

    <DemoBox
      name="ColorPicker" title="ColorPicker 颜色选择器" title-en="ColorPicker"
      description="预设与原生取色。" description-en="Predefined colors and native picker."
      :source="ColorPickerSrc" path="src/demo/form/ColorPickerDemo.vue"
    >
      <ColorPickerDemo />
    </DemoBox>

    <DemoBox
      name="TimePicker" title="TimePicker 时间选择器" title-en="TimePicker"
      description="时分秒选择。" description-en="Hour, minute and second."
      :source="TimePickerSrc" path="src/demo/form/TimePickerDemo.vue"
    >
      <TimePickerDemo />
    </DemoBox>

    <DemoBox
      name="DatePicker" title="DatePicker 日期选择器" title-en="DatePicker"
      description="日历面板选择。" description-en="Calendar panel."
      :source="DatePickerSrc" path="src/demo/form/DatePickerDemo.vue"
    >
      <DatePickerDemo />
    </DemoBox>

    <DemoBox
      name="DateTimePicker" title="DateTimePicker 日期时间" title-en="DateTimePicker"
      description="日期 + 时间。" description-en="Date and time."
      :source="DateTimePickerSrc" path="src/demo/form/DateTimePickerDemo.vue"
    >
      <DateTimePickerDemo />
    </DemoBox>

    <DemoBox
      name="TimeSelect" title="TimeSelect 时间选择" title-en="TimeSelect"
      description="固定间隔选项。" description-en="Fixed step options."
      :source="TimeSelectSrc" path="src/demo/form/TimeSelectDemo.vue"
    >
      <TimeSelectDemo />
    </DemoBox>

    <DemoBox
      name="Cascader" title="Cascader 级联选择器" title-en="Cascader"
      description="多级联动。" description-en="Multi-level linkage."
      :source="CascaderSrc" path="src/demo/form/CascaderDemo.vue"
    >
      <CascaderDemo />
    </DemoBox>

    <DemoBox
      name="TreeSelect" title="TreeSelect 树形选择" title-en="TreeSelect"
      description="树结构下拉选择。" description-en="Tree-structured dropdown."
      :source="TreeSelectSrc" path="src/demo/form/TreeSelectDemo.vue"
    >
      <TreeSelectDemo />
    </DemoBox>

    <DemoBox
      name="Transfer" title="Transfer 穿梭框" title-en="Transfer"
      description="双列移动选择。" description-en="Two-column move selection."
      :source="TransferSrc" path="src/demo/form/TransferDemo.vue"
    >
      <TransferDemo />
    </DemoBox>

    <DemoBox
      name="Upload" title="Upload 上传" title-en="Upload"
      description="拖拽与文件列表。" description-en="Drag and file list."
      :source="UploadSrc" path="src/demo/form/UploadDemo.vue"
    >
      <UploadDemo />
    </DemoBox>

    <DemoBox
      name="Autocomplete" title="Autocomplete 自动补全" title-en="Autocomplete"
      description="输入联想建议。" description-en="Input suggestions."
      :source="AutocompleteSrc" path="src/demo/form/AutocompleteDemo.vue"
    >
      <AutocompleteDemo />
    </DemoBox>

    <DemoBox
      name="InputTag" title="InputTag 标签输入" title-en="InputTag"
      description="回车新增标签。" description-en="Press Enter to add tags."
      :source="InputTagSrc" path="src/demo/form/InputTagDemo.vue"
    >
      <InputTagDemo />
    </DemoBox>

    <DemoBox
      name="InputOTP" title="InputOTP 验证码输入" title-en="InputOTP"
      description="自动聚焦与粘贴。" description-en="Auto focus and paste."
      :source="InputOTPSrc" path="src/demo/form/InputOTPDemo.vue"
    >
      <InputOTPDemo />
    </DemoBox>

    <DemoBox
      name="Mention" title="Mention 提及" title-en="Mention"
      description="输入 @ 触发联想。" description-en="Type @ to mention."
      :source="MentionSrc" path="src/demo/form/MentionDemo.vue"
    >
      <MentionDemo />
    </DemoBox>

    <DemoBox
      name="Form" title="Form 表单" title-en="Form"
      description="字段布局与校验。" description-en="Field layout and validation."
      :source="FormSrc" path="src/demo/form/FormDemo.vue"
    >
      <FormDemo />
    </DemoBox>
  </div>
</template>
