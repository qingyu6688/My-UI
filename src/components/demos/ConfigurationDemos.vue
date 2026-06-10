<script setup lang="ts">
import DemoBox from './DemoBox.vue'
import ConfigProviderDemo from '../../demo/configuration/ConfigProviderDemo.vue'
import ConfigProviderSrc from '../../demo/configuration/ConfigProviderDemo.vue?raw'
</script>

<template>
  <div class="demo-group">
    <DemoBox
      name="ConfigProvider"
      title="ConfigProvider 全局配置"
      title-en="Config Provider"
      description="注入 namespace / size / zIndex / locale 四类全局配置，子组件通过 useConfig、useSize、useZIndex、useLocale 自动响应。可实时切换看效果。"
      description-en="Inject namespace / size / zIndex / locale globally; descendants react via useConfig / useSize / useZIndex / useLocale."
      :source="ConfigProviderSrc"
      path="src/demo/configuration/ConfigProviderDemo.vue"
    >
      <ConfigProviderDemo />
    </DemoBox>
  </div>
</template>
