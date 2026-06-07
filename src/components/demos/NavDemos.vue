<script setup lang="ts">
import { reactive } from 'vue'
import DemoBlock from './DemoBlock.vue'

const state = reactive({
  menu: 'home',
  tabs: 'first',
  steps: 1,
})

const dropdownCommand = reactive({ last: '' })

function onCommand(command: string | number): void {
  dropdownCommand.last = String(command)
}
</script>

<template>
  <div class="demo-group">
    <DemoBlock name="Menu" title="Menu 菜单" description="横向导航与高亮。">
      <my-menu v-model="state.menu" mode="horizontal">
        <my-menu-item index="home">首页</my-menu-item>
        <my-menu-item index="product">产品</my-menu-item>
        <my-sub-menu index="more" title="更多">
          <my-menu-item index="more/docs">文档</my-menu-item>
          <my-menu-item index="more/blog">博客</my-menu-item>
        </my-sub-menu>
      </my-menu>
    </DemoBlock>

    <DemoBlock name="Tabs" title="Tabs 标签页" description="同级内容切换。">
      <my-tabs v-model="state.tabs">
        <my-tab-pane label="基础信息" name="first">基础信息内容</my-tab-pane>
        <my-tab-pane label="权限设置" name="second">权限设置内容</my-tab-pane>
        <my-tab-pane label="操作日志" name="third">操作日志内容</my-tab-pane>
      </my-tabs>
    </DemoBlock>

    <DemoBlock name="Breadcrumb" title="Breadcrumb 面包屑" description="层级位置。">
      <my-breadcrumb>
        <my-breadcrumb-item to="/">首页</my-breadcrumb-item>
        <my-breadcrumb-item to="/components">组件</my-breadcrumb-item>
        <my-breadcrumb-item>面包屑</my-breadcrumb-item>
      </my-breadcrumb>
    </DemoBlock>

    <DemoBlock name="Steps" title="Steps 步骤条" description="流程引导。">
      <my-steps :active="state.steps">
        <my-step title="填写信息" description="已完成" />
        <my-step title="确认订单" description="进行中" />
        <my-step title="完成" description="待开始" />
      </my-steps>
      <my-space style="margin-top: 12px;">
        <my-button size="small" @click="state.steps = Math.max(0, state.steps - 1)">上一步</my-button>
        <my-button size="small" type="primary" @click="state.steps = Math.min(2, state.steps + 1)">下一步</my-button>
      </my-space>
    </DemoBlock>

    <DemoBlock name="Dropdown" title="Dropdown 下拉菜单" description="命令派发。">
      <my-dropdown trigger="click" @command="onCommand">
        <my-button type="primary">更多操作</my-button>
        <template #dropdown>
          <my-dropdown-item command="edit">编辑</my-dropdown-item>
          <my-dropdown-item command="copy">复制</my-dropdown-item>
          <my-dropdown-item command="delete" divided>删除</my-dropdown-item>
        </template>
      </my-dropdown>
      <my-text v-if="dropdownCommand.last" type="info" style="margin-left: 12px;">
        最近命令：{{ dropdownCommand.last }}
      </my-text>
    </DemoBlock>

    <DemoBlock name="PageHeader" title="PageHeader 页头" description="返回与标题。">
      <my-page-header title="订单详情" content="编号 #20260607">
        <template #extra>
          <my-button size="small">编辑</my-button>
          <my-button size="small" type="primary">保存</my-button>
        </template>
      </my-page-header>
    </DemoBlock>

    <DemoBlock name="Anchor" title="Anchor 锚点" description="页内滚动定位。">
      <my-anchor
        :links="[
          { href: '#Menu', title: 'Menu 菜单' },
          { href: '#Tabs', title: 'Tabs 标签页' },
          { href: '#Steps', title: 'Steps 步骤条' },
        ]"
        :offset="80"
      />
    </DemoBlock>

    <DemoBlock name="Backtop / Affix" title="Backtop / Affix" description="回到顶部与固钉为全局滚动行为，已在页面右下角与滚动场景生效。">
      <my-text type="info">滚动页面时右下角会出现「回到顶部」按钮。</my-text>
    </DemoBlock>
  </div>
</template>
