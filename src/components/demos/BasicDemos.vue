<script setup lang="ts">
import DemoBox from './DemoBox.vue'
import BorderDemo from '../../demo/basic/BorderDemo.vue'
import BorderSrc from '../../demo/basic/BorderDemo.vue?raw'
import ButtonDemo from '../../demo/basic/ButtonDemo.vue'
import ButtonSrc from '../../demo/basic/ButtonDemo.vue?raw'
import ColorDemo from '../../demo/basic/ColorDemo.vue'
import ColorSrc from '../../demo/basic/ColorDemo.vue?raw'
import ContainerDemo from '../../demo/basic/ContainerDemo.vue'
import ContainerSrc from '../../demo/basic/ContainerDemo.vue?raw'
import IconDemo from '../../demo/basic/IconDemo.vue'
import IconSrc from '../../demo/basic/IconDemo.vue?raw'
import LayoutDemo from '../../demo/basic/LayoutDemo.vue'
import LayoutSrc from '../../demo/basic/LayoutDemo.vue?raw'
import LinkDemo from '../../demo/basic/LinkDemo.vue'
import LinkSrc from '../../demo/basic/LinkDemo.vue?raw'
import ScrollbarDemo from '../../demo/basic/ScrollbarDemo.vue'
import ScrollbarSrc from '../../demo/basic/ScrollbarDemo.vue?raw'
import SpaceDemo from '../../demo/basic/SpaceDemo.vue'
import SpaceSrc from '../../demo/basic/SpaceDemo.vue?raw'
import SplitterDemo from '../../demo/basic/SplitterDemo.vue'
import SplitterSrc from '../../demo/basic/SplitterDemo.vue?raw'
import TextDemo from '../../demo/basic/TextDemo.vue'
import TextSrc from '../../demo/basic/TextDemo.vue?raw'
import TypographyDemo from '../../demo/basic/TypographyDemo.vue'
import TypographySrc from '../../demo/basic/TypographyDemo.vue?raw'
</script>

<template>
  <div class="demo-group">
    <DemoBox
      name="Button" title="Button 按钮" title-en="Button"
      description="支持类型、朴素、圆角、禁用与加载状态。"
      description-en="Type, plain, round, disabled and loading states."
      :source="ButtonSrc" path="src/demo/basic/ButtonDemo.vue"
    >
      <ButtonDemo />
    </DemoBox>

    <DemoBox
      name="Border" title="Border 边框" title-en="Border"
      description="圆角、边框色与阴影 token，可被主题变量统一控制。"
      description-en="Radius, border color and shadow tokens unified by theme variables."
      :source="BorderSrc" path="src/demo/basic/BorderDemo.vue"
    >
      <BorderDemo />
    </DemoBox>

    <DemoBox
      name="Color" title="Color 色彩" title-en="Color"
      description="主题色派生、辅助色、强调色与语义色色板。"
      description-en="Theme color ramp, accent, semantic colors palette."
      :source="ColorSrc" path="src/demo/basic/ColorDemo.vue"
    >
      <ColorDemo />
    </DemoBox>

    <DemoBox
      name="Container" title="Container 布局容器" title-en="Container"
      description="Header / Aside / Main / Footer 组合。"
      description-en="Header / Aside / Main / Footer composition."
      :source="ContainerSrc" path="src/demo/basic/ContainerDemo.vue"
    >
      <ContainerDemo />
    </DemoBox>

    <DemoBox
      name="Icon" title="Icon 图标" title-en="Icon"
      description="内置图标集合，支持搜索、复制组件名，并兼容外部 SVG。"
      description-en="Built-in icon gallery with search, copy and external SVG compatibility."
      :source="IconSrc" path="src/demo/basic/IconDemo.vue"
    >
      <IconDemo />
    </DemoBox>

    <DemoBox
      name="Layout" title="Layout 布局" title-en="Layout"
      description="24 栅格、gutter、offset、push、pull。"
      description-en="24-grid, gutter, offset, push, pull."
      :source="LayoutSrc" path="src/demo/basic/LayoutDemo.vue"
    >
      <LayoutDemo />
    </DemoBox>

    <DemoBox
      name="Link" title="Link 链接" title-en="Link"
      description="类型、下划线、禁用与外链。"
      description-en="Type, underline, disabled and external links."
      :source="LinkSrc" path="src/demo/basic/LinkDemo.vue"
    >
      <LinkDemo />
    </DemoBox>

    <DemoBox
      name="Text" title="Text 文本" title-en="Text"
      description="语义类型、尺寸与截断。"
      description-en="Semantic type, size and truncation."
      :source="TextSrc" path="src/demo/basic/TextDemo.vue"
    >
      <TextDemo />
    </DemoBox>

    <DemoBox
      name="Scrollbar" title="Scrollbar 滚动条" title-en="Scrollbar"
      description="自定义滚动条容器。"
      description-en="Custom scrollbar container."
      :source="ScrollbarSrc" path="src/demo/basic/ScrollbarDemo.vue"
    >
      <ScrollbarDemo />
    </DemoBox>

    <DemoBox
      name="Space" title="Space 间距" title-en="Space"
      description="水平与垂直间距排布。"
      description-en="Horizontal and vertical spacing layout."
      :source="SpaceSrc" path="src/demo/basic/SpaceDemo.vue"
    >
      <SpaceDemo />
    </DemoBox>

    <DemoBox
      name="Splitter" title="Splitter 分隔面板" title-en="Splitter"
      description="拖拽中间分隔条调整比例。"
      description-en="Drag the splitter to adjust the panel ratio."
      :source="SplitterSrc" path="src/demo/basic/SplitterDemo.vue"
    >
      <SplitterDemo />
    </DemoBox>

    <DemoBox
      name="Typography" title="Typography 排版" title-en="Typography"
      description="标题与段落语义排版。"
      description-en="Semantic Title and Paragraph typography."
      :source="TypographySrc" path="src/demo/basic/TypographyDemo.vue"
    >
      <TypographyDemo />
    </DemoBox>
  </div>
</template>
