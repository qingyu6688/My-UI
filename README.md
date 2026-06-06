# My UI

My UI 是一个基于 Vue 3、TypeScript、Vite 的前端组件库。项目默认主题为鼠尾草浅黄，并支持运行时切换主题色。

## 默认主题

| 名称 | 色值 |
| --- | --- |
| 鼠尾草主色 | `#a8d5ba` |
| 浅绿辅助色 | `#d7e8bd` |
| 浅黄强调色 | `#fff3c7` |

## 本地开发

```bash
npm install
npm run dev
```

## 常用命令

```bash
npm test
npm run build
npm run lint
npm run docs:dev
```

## 目录说明

```text
packages/       组件库源码
src/            本地预览入口
docs/           项目文档和文档站
tests/          E2E 测试目录
internal/       内部脚本和构建辅助
migrations/     数据库迁移占位目录
```

详细需求见 [docs/requirements.md](docs/requirements.md)。

