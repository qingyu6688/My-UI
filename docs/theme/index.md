# 主题编辑器

主题编辑器用于验证 My UI 的运行时换肤能力。修改主色、辅助色和强调色后，按钮、标签、提示、表单和表格等组件会跟随 CSS Variables 立即更新。

<ThemeEditor />

## 使用建议

- 主色承担主要操作和选中态，不建议使用过浅颜色。
- 辅助色适合轻量背景、状态提示和次级信息区域。
- 强调色适合温和提示、空状态和需要柔和区分的模块。
- 主题色修改后需要检查文字对比度，避免浅色背景上文字不可读。

## 在代码中应用

```ts
import { applyTheme, createTheme } from '@qingyu6688/my-ui'

applyTheme(
  createTheme({
    primary: '#a8d5ba',
    secondary: '#d7e8bd',
    accent: '#fff3c7',
  }),
)
```

## 后续计划

- 支持导出 CSS Variables 片段。
- 支持导出和导入主题 JSON。
- 保存最近使用主题。
- 增加颜色对比度提示。

