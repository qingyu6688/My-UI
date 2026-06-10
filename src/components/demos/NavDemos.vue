<script setup lang="ts">
import DemoBox from './DemoBox.vue'
import MenuDemo from '../../demo/nav/MenuDemo.vue'
import MenuSrc from '../../demo/nav/MenuDemo.vue?raw'
import TabsDemo from '../../demo/nav/TabsDemo.vue'
import TabsSrc from '../../demo/nav/TabsDemo.vue?raw'
import BreadcrumbDemo from '../../demo/nav/BreadcrumbDemo.vue'
import BreadcrumbSrc from '../../demo/nav/BreadcrumbDemo.vue?raw'
import StepsDemo from '../../demo/nav/StepsDemo.vue'
import StepsSrc from '../../demo/nav/StepsDemo.vue?raw'
import DropdownDemo from '../../demo/nav/DropdownDemo.vue'
import DropdownSrc from '../../demo/nav/DropdownDemo.vue?raw'
import PageHeaderDemo from '../../demo/nav/PageHeaderDemo.vue'
import PageHeaderSrc from '../../demo/nav/PageHeaderDemo.vue?raw'
import AnchorDemo from '../../demo/nav/AnchorDemo.vue'
import AnchorSrc from '../../demo/nav/AnchorDemo.vue?raw'
import BacktopDemo from '../../demo/nav/BacktopDemo.vue'
import BacktopSrc from '../../demo/nav/BacktopDemo.vue?raw'
import AffixDemo from '../../demo/nav/AffixDemo.vue'
import AffixSrc from '../../demo/nav/AffixDemo.vue?raw'
</script>

<template>
  <div class="demo-group">
    <DemoBox
      name="Menu" title="Menu 菜单" title-en="Menu"
      description="横向导航与高亮。" description-en="Horizontal nav with active state."
      :source="MenuSrc" path="src/demo/nav/MenuDemo.vue"
    >
      <MenuDemo />
    </DemoBox>

    <DemoBox
      name="Tabs" title="Tabs 标签页" title-en="Tabs"
      description="同级内容切换。" description-en="Switch sibling content."
      :source="TabsSrc" path="src/demo/nav/TabsDemo.vue"
    >
      <TabsDemo />
    </DemoBox>

    <DemoBox
      name="Breadcrumb" title="Breadcrumb 面包屑" title-en="Breadcrumb"
      description="层级位置。" description-en="Show hierarchy."
      :source="BreadcrumbSrc" path="src/demo/nav/BreadcrumbDemo.vue"
    >
      <BreadcrumbDemo />
    </DemoBox>

    <DemoBox
      name="Steps" title="Steps 步骤条" title-en="Steps"
      description="流程引导。" description-en="Guide users through steps."
      :source="StepsSrc" path="src/demo/nav/StepsDemo.vue"
    >
      <StepsDemo />
    </DemoBox>

    <DemoBox
      name="Dropdown" title="Dropdown 下拉菜单" title-en="Dropdown"
      description="命令派发。" description-en="Dispatch commands."
      :source="DropdownSrc" path="src/demo/nav/DropdownDemo.vue"
    >
      <DropdownDemo />
    </DemoBox>

    <DemoBox
      name="PageHeader" title="PageHeader 页头" title-en="PageHeader"
      description="返回与标题。" description-en="Title with back and extras."
      :source="PageHeaderSrc" path="src/demo/nav/PageHeaderDemo.vue"
    >
      <PageHeaderDemo />
    </DemoBox>

    <DemoBox
      name="Anchor" title="Anchor 锚点" title-en="Anchor"
      description="页内滚动定位。" description-en="In-page scroll links."
      :source="AnchorSrc" path="src/demo/nav/AnchorDemo.vue"
    >
      <AnchorDemo />
    </DemoBox>

    <DemoBox
      name="Affix" title="Affix 固钉" title-en="Affix"
      description="将元素固定在容器内的滚动位置。" description-en="Fix an element to a position while scrolling."
      :source="AffixSrc" path="src/demo/nav/AffixDemo.vue"
    >
      <AffixDemo />
    </DemoBox>

    <DemoBox
      name="Backtop" title="Backtop 回到顶部" title-en="Backtop"
      description="滚动到一定距离后出现的回到顶部按钮。" description-en="Show a back-to-top button after scrolling."
      :source="BacktopSrc" path="src/demo/nav/BacktopDemo.vue"
    >
      <BacktopDemo />
    </DemoBox>
  </div>
</template>
