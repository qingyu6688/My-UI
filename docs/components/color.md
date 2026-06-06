# Color 色彩

展示默认主题色、语义色和运行时主题变量。

## 默认主题色

| 名称 | 色值 | 用途 |
| --- | --- | --- |
| 主色 | `#a8d5ba` | 主按钮、选中态、焦点态 |
| 辅助色 | `#d7e8bd` | 辅助背景、成功状态 |
| 强调色 | `#fff3c7` | 温和提示、弱警告 |

## 运行时主题

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

## 相关文档

- [主题定制](/guide/theme)
- [主题编辑器](/theme/)
- [API 文档](/api)

