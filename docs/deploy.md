# 部署说明

## 安装依赖

```bash
npm install
```

## 本地预览

```bash
npm run dev
```

## 构建组件库

```bash
npm run build
```

构建产物位于 `packages/my-ui/dist/`。

## 构建文档站

```bash
npm run docs:build
```

构建产物位于 `docs/.vitepress/dist/`。

## 发布前检查

```bash
npm test
npm run lint
npm run build
```

发布前确认 `.env` 没有被提交，版本号和 `docs/changelog.md` 已更新。

