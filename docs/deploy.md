# 部署说明

本项目包含两类构建产物：组件库产物和 VitePress 文档站产物。发布前需要先完成测试、类型检查、lint 和构建验证。

## 安装依赖

```bash
npm install
```

## 本地预览

```bash
npm run dev
```

默认地址：`http://localhost:5173/`。

## 构建组件库

```bash
npm run build
```

构建产物位于：`packages/my-ui/dist/`。

## 构建文档站

```bash
npm run docs:build
```

构建产物位于：`docs/.vitepress/dist/`。

## 发布前检查

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run docs:build
```

## GitHub 推送

```bash
git status
git add .
git commit -m "docs: 重写项目文档"
git push origin main
```

## 注意事项

- 不要提交 `.env`、本地缓存、临时日志和私钥文件。
- 每次更新后同步递增版本号，并在 `docs/changelog.md` 记录变更。
- 如果后续发布 npm 包，需要补充 `exports`、类型声明和组件级样式入口检查。

