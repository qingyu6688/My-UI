<script setup lang="ts">
import { reactive } from 'vue'
import DemoBlock from './DemoBlock.vue'

const state = reactive({
  collapse: ['1'],
  carousel: 0,
  calendar: new Date(),
})

const tableData = [
  { id: 1, name: '苹果', price: 5, category: 'fruit' },
  { id: 2, name: '香蕉', price: 3, category: 'fruit' },
  { id: 3, name: '胡萝卜', price: 2, category: 'vegetable' },
]

const treeData = [
  {
    key: '1',
    label: '设计',
    children: [
      { key: '1-1', label: '视觉' },
      { key: '1-2', label: '交互' },
    ],
  },
  { key: '2', label: '研发' },
]

const virtualItems = Array.from({ length: 1000 }, (_, i) => `列表项 ${i + 1}`)
</script>

<template>
  <div class="demo-group">
    <DemoBlock name="Tag" title="Tag 标签" description="类型与效果。">
      <my-space wrap>
        <my-tag type="primary">主要</my-tag>
        <my-tag type="success">成功</my-tag>
        <my-tag type="warning">警告</my-tag>
        <my-tag type="danger">危险</my-tag>
        <my-tag type="primary" effect="dark">深色</my-tag>
        <my-tag round>圆角</my-tag>
        <my-tag closable>可关闭</my-tag>
      </my-space>
    </DemoBlock>

    <DemoBlock name="Badge" title="Badge 徽章" description="数字、圆点与最大值。">
      <my-space :size="24" align="center">
        <my-badge :value="12"><my-button>消息</my-button></my-badge>
        <my-badge :value="200" :max="99"><my-button>通知</my-button></my-badge>
        <my-badge is-dot><my-button>动态</my-button></my-badge>
      </my-space>
    </DemoBlock>

    <DemoBlock name="Avatar" title="Avatar 头像" description="文字、形状与尺寸。">
      <my-space align="center">
        <my-avatar alt="张" />
        <my-avatar shape="square" alt="李" />
        <my-avatar size="large" alt="王" />
        <my-avatar size="small" alt="赵" />
      </my-space>
    </DemoBlock>

    <DemoBlock name="Progress" title="Progress 进度条" description="线形与环形。">
      <div style="max-width: 320px;">
        <my-progress :percentage="40" />
        <my-progress :percentage="70" status="success" style="margin-top: 8px;" />
      </div>
      <my-space style="margin-top: 12px;">
        <my-progress type="circle" :percentage="65" />
        <my-progress type="circle" :percentage="100" status="success" />
      </my-space>
    </DemoBlock>

    <DemoBlock name="Card" title="Card 卡片" description="头部、内容与底部。">
      <my-card header="卡片标题" style="max-width: 320px;">
        卡片内容区域，可承载任意信息。
        <template #footer>
          <my-button type="primary" size="small">操作</my-button>
        </template>
      </my-card>
    </DemoBlock>

    <DemoBlock name="Descriptions" title="Descriptions 描述列表" description="带边框的键值展示。">
      <my-descriptions title="用户信息" :column="2" border>
        <my-descriptions-item label="姓名">张三</my-descriptions-item>
        <my-descriptions-item label="城市">北京</my-descriptions-item>
        <my-descriptions-item label="邮箱">zhangsan@example.com</my-descriptions-item>
        <my-descriptions-item label="电话">138-0000-0000</my-descriptions-item>
      </my-descriptions>
    </DemoBlock>

    <DemoBlock name="Empty" title="Empty 空状态" description="默认插画与操作。">
      <my-empty description="暂无数据">
        <my-button type="primary" size="small">新建</my-button>
      </my-empty>
    </DemoBlock>

    <DemoBlock name="Skeleton" title="Skeleton 骨架屏" description="加载占位。">
      <my-skeleton :rows="3" avatar />
    </DemoBlock>

    <DemoBlock name="Image" title="Image 图片" description="占位与失败回退。">
      <my-image
        src="https://element-plus.org/images/element-plus-logo.svg"
        :width="160"
        :height="80"
        fit="contain"
      />
    </DemoBlock>

    <DemoBlock name="Table" title="Table 表格" description="排序、筛选与斑马纹。">
      <my-table :data="tableData" row-key="id" stripe border>
        <my-table-column prop="id" label="ID" width="70" />
        <my-table-column prop="name" label="名称" />
        <my-table-column prop="price" label="价格" align="right" sortable />
        <my-table-column
          prop="category"
          label="分类"
          :filters="[
            { text: '水果', value: 'fruit' },
            { text: '蔬菜', value: 'vegetable' },
          ]"
        />
      </my-table>
    </DemoBlock>

    <DemoBlock name="Pagination" title="Pagination 分页" description="页码与跳转。">
      <my-pagination :total="200" :page-size="10" :current-page="1" />
    </DemoBlock>

    <DemoBlock name="Collapse" title="Collapse 折叠面板" description="展开与收起。">
      <my-collapse v-model="state.collapse">
        <my-collapse-item name="1" title="什么是 My UI">
          基于 Vue 3 的鼠尾草浅黄主题组件库。
        </my-collapse-item>
        <my-collapse-item name="2" title="如何使用">
          安装后通过插件方式全量引入，或按需导入单个组件。
        </my-collapse-item>
      </my-collapse>
    </DemoBlock>

    <DemoBlock name="Timeline" title="Timeline 时间线" description="节点与时间戳。">
      <my-timeline>
        <my-timeline-item timestamp="2026-01-01" type="success">项目创建</my-timeline-item>
        <my-timeline-item timestamp="2026-03-01" type="primary">完成 P0 组件</my-timeline-item>
        <my-timeline-item timestamp="2026-06-01">完成全部组件</my-timeline-item>
      </my-timeline>
    </DemoBlock>

    <DemoBlock name="Statistic" title="Statistic 统计数值" description="千分位与前后缀。">
      <my-space :size="48">
        <my-statistic title="活跃用户" :value="172800" />
        <my-statistic title="转化率" :value="92.6" :precision="1" suffix="%" />
      </my-space>
    </DemoBlock>

    <DemoBlock name="Tree" title="Tree 树形控件" description="展开、选择与勾选。">
      <my-tree :data="treeData" show-checkbox default-expand-all />
    </DemoBlock>

    <DemoBlock name="Carousel" title="Carousel 走马灯" description="自动轮播。">
      <my-carousel v-model="state.carousel" height="140px">
        <my-carousel-item>
          <div class="demo-carousel-slide" style="background: var(--my-color-primary-light-5);">第一页</div>
        </my-carousel-item>
        <my-carousel-item>
          <div class="demo-carousel-slide" style="background: var(--my-color-secondary-light-5);">第二页</div>
        </my-carousel-item>
        <my-carousel-item>
          <div class="demo-carousel-slide" style="background: var(--my-color-accent-light-5);">第三页</div>
        </my-carousel-item>
      </my-carousel>
    </DemoBlock>

    <DemoBlock name="Calendar" title="Calendar 日历" description="月视图选择。">
      <div style="max-width: 360px;">
        <my-calendar v-model="state.calendar" />
      </div>
    </DemoBlock>

    <DemoBlock name="VirtualList" title="VirtualList 虚拟列表" description="千条数据仅渲染可视区。">
      <my-virtual-list :items="virtualItems" :item-height="36" :height="220">
        <template #default="{ item }">{{ item }}</template>
      </my-virtual-list>
    </DemoBlock>
  </div>
</template>
