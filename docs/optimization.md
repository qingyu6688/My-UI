# 对标 Element Plus 优化方案

## 1. 现状

- 已实现 **77 个**组件，覆盖 EP 82 个组件清单中的绝大部分。
- 已建立 ConfigProvider 配置中心，部分组件接入全局 size。
- 232 个单元测试全过，typecheck / lint / build / docs:build 干净。
- 文档站组件画廊已对齐 EP 三栏布局（侧边导航 + 内容 + TOC + 工具栏 4 按钮）。

## 2. 与 Element Plus 的差距

### 2.1 缺失组件（6 个，本方案补齐）

| 名称 | 分类 | 优先级 | 说明 |
| --- | --- | --- | --- |
| Notification | 反馈 | P0 | 四角通知卡片，独立于 Message |
| Color Picker Panel | 表单 | P1 | 可嵌入面板，主题编辑器场景 |
| Date Picker Panel | 表单 | P1 | 可嵌入日历面板 |
| Virtualized Select | 表单 | P1 | 千级选项性能优化 |
| Virtualized Table | 数据 | P1 | 大数据表格 |
| Virtualized Tree | 数据 | P1 | 大数据树 |

### 2.2 EP 中是文档展示页（非真组件）

| 名称 | EP 中的用途 | 我们的处理 |
| --- | --- | --- |
| Border | 边框圆角变量展示 | 后续在主题编辑器里补展示区 |
| Color | 主题色色板 | 已有 `docs/components/color.md` |

## 3. 三轮优化计划

### Phase A（本轮：缺失组件补齐）

1. **Notification**：函数式 `Notification.success/warning/danger/info`，4 角位置堆叠，自动消失，可关闭。
2. **ColorPickerPanel / DatePickerPanel**：从对应 Picker 提取面板逻辑，独立可嵌入组件。
3. **VirtualizedSelect / VirtualizedTable / VirtualizedTree**：基于已有 `VirtualList`，包装大数据变体。
4. 注册 + 全套验证。

### Phase B（命名空间与全局配置真正落地）

| 项 | 现状 | 目标 |
| --- | --- | --- |
| `my-` 类名前缀 | 硬编码在每个组件的 BEM 类里 | 通过 `useNamespace()` 派生，跟随 ConfigProvider `namespace` |
| 全局 size | 仅 Button/Tag/Switch/Segmented/InputNumber/Form/Input/Select/Radio-Group/Checkbox-Group | 扩展到所有 size-aware 组件（Avatar/Cascader/各 Picker 等） |
| 全局 zIndex | useZIndex 已存在 | 让 Dialog/Drawer/弹层组件统一从 useZIndex 取递增层级 |

### Phase C（质量与可访问性）

| 方向 | 检查项 |
| --- | --- |
| **a11y** | 弹层组件焦点回收、`role` / `aria-*` 完整、键盘导航（Esc/Tab/箭头） |
| **暗色模式** | 排查所有组件在 `html.dark` 下的对比度与背景；补齐遗漏 token |
| **API 文档** | 文档站当前是 stub，需补 Props / Events / Slots / Exposes 表格 |
| **类型严谨度** | 消除 `any` / `unknown` 的剩余实例 |
| **i18n 语言包** | 现有 zh-cn / en，可扩展 ja / ko / es 等高频语种 |
| **按需引入** | 通过 unplugin-vue-components 自动按需引入验证；检查 sideEffects 配置 |
| **组件深度测试** | 现有 232 个用例覆盖核心；为复杂组件（Table/Form/Select）补边界用例 |

### Phase D（演练场与文档站增强）

- 演练场支持 import map 自定义、多文件项目、TS/JS 切换。
- 文档站组件 demo 加 Element Plus 同款多语言切换。
- 加 Element Plus design tokens 速查页面。

## 4. 本轮交付指标

- 组件数：77 → **83**（与 EP 真组件清单 1:1 对齐，仅余 Border/Color 两个文档页）
- 测试：维持 232+ 不破坏
- typecheck / lint / docs:build：保持干净
- 性能：Virtualized 系列在 10k 数据下保持 60fps 滚动
