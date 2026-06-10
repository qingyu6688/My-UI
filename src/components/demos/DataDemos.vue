<script setup lang="ts">
import DemoBox from './DemoBox.vue'
import TagDemo from '../../demo/data/TagDemo.vue'
import TagSrc from '../../demo/data/TagDemo.vue?raw'
import BadgeDemo from '../../demo/data/BadgeDemo.vue'
import BadgeSrc from '../../demo/data/BadgeDemo.vue?raw'
import AvatarDemo from '../../demo/data/AvatarDemo.vue'
import AvatarSrc from '../../demo/data/AvatarDemo.vue?raw'
import ProgressDemo from '../../demo/data/ProgressDemo.vue'
import ProgressSrc from '../../demo/data/ProgressDemo.vue?raw'
import CardDemo from '../../demo/data/CardDemo.vue'
import CardSrc from '../../demo/data/CardDemo.vue?raw'
import DescriptionsDemo from '../../demo/data/DescriptionsDemo.vue'
import DescriptionsSrc from '../../demo/data/DescriptionsDemo.vue?raw'
import EmptyDemo from '../../demo/data/EmptyDemo.vue'
import EmptySrc from '../../demo/data/EmptyDemo.vue?raw'
import SkeletonDemo from '../../demo/data/SkeletonDemo.vue'
import SkeletonSrc from '../../demo/data/SkeletonDemo.vue?raw'
import ImageDemo from '../../demo/data/ImageDemo.vue'
import ImageSrc from '../../demo/data/ImageDemo.vue?raw'
import TableDemo from '../../demo/data/TableDemo.vue'
import TableSrc from '../../demo/data/TableDemo.vue?raw'
import PaginationDemo from '../../demo/data/PaginationDemo.vue'
import PaginationSrc from '../../demo/data/PaginationDemo.vue?raw'
import CollapseDemo from '../../demo/data/CollapseDemo.vue'
import CollapseSrc from '../../demo/data/CollapseDemo.vue?raw'
import TimelineDemo from '../../demo/data/TimelineDemo.vue'
import TimelineSrc from '../../demo/data/TimelineDemo.vue?raw'
import StatisticDemo from '../../demo/data/StatisticDemo.vue'
import StatisticSrc from '../../demo/data/StatisticDemo.vue?raw'
import TreeDemo from '../../demo/data/TreeDemo.vue'
import TreeSrc from '../../demo/data/TreeDemo.vue?raw'
import CarouselDemo from '../../demo/data/CarouselDemo.vue'
import CarouselSrc from '../../demo/data/CarouselDemo.vue?raw'
import CalendarDemo from '../../demo/data/CalendarDemo.vue'
import CalendarSrc from '../../demo/data/CalendarDemo.vue?raw'
import VirtualListDemo from '../../demo/data/VirtualListDemo.vue'
import VirtualListSrc from '../../demo/data/VirtualListDemo.vue?raw'
import VirtualizedTableDemo from '../../demo/data/VirtualizedTableDemo.vue'
import VirtualizedTableSrc from '../../demo/data/VirtualizedTableDemo.vue?raw'
import VirtualizedTreeDemo from '../../demo/data/VirtualizedTreeDemo.vue'
import VirtualizedTreeSrc from '../../demo/data/VirtualizedTreeDemo.vue?raw'
import InfiniteScrollDemo from '../../demo/data/InfiniteScrollDemo.vue'
import InfiniteScrollSrc from '../../demo/data/InfiniteScrollDemo.vue?raw'
</script>

<template>
  <div class="demo-group">
    <DemoBox
      name="Tag" title="Tag 标签" title-en="Tag"
      description="类型与效果。" description-en="Types and effects."
      :source="TagSrc" path="src/demo/data/TagDemo.vue"
    >
      <TagDemo />
    </DemoBox>

    <DemoBox
      name="Badge" title="Badge 徽章" title-en="Badge"
      description="数字、圆点与最大值。" description-en="Number, dot and max."
      :source="BadgeSrc" path="src/demo/data/BadgeDemo.vue"
    >
      <BadgeDemo />
    </DemoBox>

    <DemoBox
      name="Avatar" title="Avatar 头像" title-en="Avatar"
      description="文字、形状与尺寸。" description-en="Text, shape and size."
      :source="AvatarSrc" path="src/demo/data/AvatarDemo.vue"
    >
      <AvatarDemo />
    </DemoBox>

    <DemoBox
      name="Progress" title="Progress 进度条" title-en="Progress"
      description="线形与环形。" description-en="Line and circle."
      :source="ProgressSrc" path="src/demo/data/ProgressDemo.vue"
    >
      <ProgressDemo />
    </DemoBox>

    <DemoBox
      name="Card" title="Card 卡片" title-en="Card"
      description="头部、内容与底部。" description-en="Header, body and footer."
      :source="CardSrc" path="src/demo/data/CardDemo.vue"
    >
      <CardDemo />
    </DemoBox>

    <DemoBox
      name="Descriptions" title="Descriptions 描述列表" title-en="Descriptions"
      description="带边框的键值展示。" description-en="Bordered key-value listing."
      :source="DescriptionsSrc" path="src/demo/data/DescriptionsDemo.vue"
    >
      <DescriptionsDemo />
    </DemoBox>

    <DemoBox
      name="Empty" title="Empty 空状态" title-en="Empty"
      description="默认插画与操作。" description-en="Illustration and actions."
      :source="EmptySrc" path="src/demo/data/EmptyDemo.vue"
    >
      <EmptyDemo />
    </DemoBox>

    <DemoBox
      name="Skeleton" title="Skeleton 骨架屏" title-en="Skeleton"
      description="加载占位。" description-en="Loading placeholder."
      :source="SkeletonSrc" path="src/demo/data/SkeletonDemo.vue"
    >
      <SkeletonDemo />
    </DemoBox>

    <DemoBox
      name="Image" title="Image 图片" title-en="Image"
      description="占位与失败回退。" description-en="Placeholder and fallback."
      :source="ImageSrc" path="src/demo/data/ImageDemo.vue"
    >
      <ImageDemo />
    </DemoBox>

    <DemoBox
      name="Table" title="Table 表格" title-en="Table"
      description="排序、筛选与斑马纹。" description-en="Sort, filter and stripe."
      :source="TableSrc" path="src/demo/data/TableDemo.vue"
    >
      <TableDemo />
    </DemoBox>

    <DemoBox
      name="Pagination" title="Pagination 分页" title-en="Pagination"
      description="页码与跳转。" description-en="Pages and jumper."
      :source="PaginationSrc" path="src/demo/data/PaginationDemo.vue"
    >
      <PaginationDemo />
    </DemoBox>

    <DemoBox
      name="Collapse" title="Collapse 折叠面板" title-en="Collapse"
      description="展开与收起。" description-en="Expand and collapse."
      :source="CollapseSrc" path="src/demo/data/CollapseDemo.vue"
    >
      <CollapseDemo />
    </DemoBox>

    <DemoBox
      name="Timeline" title="Timeline 时间线" title-en="Timeline"
      description="节点与时间戳。" description-en="Nodes with timestamps."
      :source="TimelineSrc" path="src/demo/data/TimelineDemo.vue"
    >
      <TimelineDemo />
    </DemoBox>

    <DemoBox
      name="Statistic" title="Statistic 统计数值" title-en="Statistic"
      description="千分位与前后缀。" description-en="Grouping and affix."
      :source="StatisticSrc" path="src/demo/data/StatisticDemo.vue"
    >
      <StatisticDemo />
    </DemoBox>

    <DemoBox
      name="Tree" title="Tree 树形控件" title-en="Tree"
      description="展开、选择与勾选。" description-en="Expand, select and check."
      :source="TreeSrc" path="src/demo/data/TreeDemo.vue"
    >
      <TreeDemo />
    </DemoBox>

    <DemoBox
      name="Carousel" title="Carousel 走马灯" title-en="Carousel"
      description="自动轮播。" description-en="Autoplay slides."
      :source="CarouselSrc" path="src/demo/data/CarouselDemo.vue"
    >
      <CarouselDemo />
    </DemoBox>

    <DemoBox
      name="Calendar" title="Calendar 日历" title-en="Calendar"
      description="月视图选择。" description-en="Month-view picker."
      :source="CalendarSrc" path="src/demo/data/CalendarDemo.vue"
    >
      <CalendarDemo />
    </DemoBox>

    <DemoBox
      name="VirtualList" title="VirtualList 虚拟列表" title-en="VirtualList"
      description="千条数据仅渲染可视区。" description-en="Renders only visible items for 1k+ data."
      :source="VirtualListSrc" path="src/demo/data/VirtualListDemo.vue"
    >
      <VirtualListDemo />
    </DemoBox>

    <DemoBox
      name="VirtualizedTable" title="VirtualizedTable 虚拟化表格" title-en="VirtualizedTable"
      description="千行表格虚拟滚动。" description-en="Virtual scrolling for 1k+ rows."
      :source="VirtualizedTableSrc" path="src/demo/data/VirtualizedTableDemo.vue"
    >
      <VirtualizedTableDemo />
    </DemoBox>

    <DemoBox
      name="VirtualizedTree" title="VirtualizedTree 虚拟化树形控件" title-en="VirtualizedTree"
      description="深层级树仅渲染可视节点。" description-en="Render only visible nodes for deep trees."
      :source="VirtualizedTreeSrc" path="src/demo/data/VirtualizedTreeDemo.vue"
    >
      <VirtualizedTreeDemo />
    </DemoBox>

    <DemoBox
      name="InfiniteScroll" title="InfiniteScroll 无限滚动" title-en="InfiniteScroll"
      description="滚动到底部自动加载。" description-en="Auto-load on scroll to bottom."
      :source="InfiniteScrollSrc" path="src/demo/data/InfiniteScrollDemo.vue"
    >
      <InfiniteScrollDemo />
    </DemoBox>
  </div>
</template>
