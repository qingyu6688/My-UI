# My UI

My UI 是一个基于 Vue 3、TypeScript 和 Vite 的前端组件库。项目参考 Element Plus 的文档站组织方式和组件分层方式，重点做一套适合后台系统、管理端页面和工具型产品的组件基础设施。

当前默认主题是鼠尾草浅黄：

| 主题色 | 色值 | 用途 |
| --- | --- | --- |
| 主色 | `#a8d5ba` | 主按钮、选中态、焦点态、重点链接 |
| 辅助色 | `#d7e8bd` | 轻量背景、成功提示、辅助状态 |
| 强调色 | `#fff3c7` | 温和提示、弱警告、空状态背景 |

## 当前进度

- 已建立 Vue 3 + TypeScript + Vite 组件库工程。
- 已接入 VitePress 文档站和本地预览站。
- 已实现运行时主题能力：`createTheme`、`applyTheme`、`useTheme`。
- 已导出 75 个组件模块，覆盖基础、表单、数据展示、导航、反馈和其他增强组件。
- 首页、指南、组件、主题、路线已经拆成独立页面。

## 本地开发

```bash
npm install
npm run dev
```

开发服务器默认运行在 `http://localhost:5173/`。

## 文档站

```bash
npm run docs:dev
npm run docs:build
```

文档入口位于 `docs/`，组件文档位于 `docs/components/`。

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动本地预览站 |
| `npm run docs:dev` | 启动 VitePress 文档站 |
| `npm run typecheck` | TypeScript 类型检查 |
| `npm run lint` | ESLint 检查 |
| `npm test` | 运行 Vitest 单元测试 |
| `npm run build` | 构建组件库产物 |
| `npm run docs:build` | 构建文档站 |

## 目录说明

```text
packages/components/     组件源码
packages/hooks/          组合式函数，包含主题与配置能力
packages/theme-chalk/    组件样式和主题变量
packages/my-ui/          组件库统一安装入口
packages/utils/          通用工具函数
src/                     本地预览站页面
src/router/              本地预览站路由
docs/                    VitePress 文档站
play/                    调试和实验入口
```

## 开发约定

- 回答、文档、注释和错误提示统一使用中文。
- 代码使用 2 空格缩进，组件名使用 PascalCase，函数和变量使用 camelCase。
- 新增组件需要同步补充导出、样式入口、文档和测试。
- 提交前至少执行 `npm run typecheck`、`npm run lint`、`npm test`、`npm run build`。

开发者备注：maorongkang@gmail.com
