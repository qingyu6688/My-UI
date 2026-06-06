# 主题定制

My UI 使用 CSS Variables 承载主题变量，可以在运行时修改颜色。

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

## 默认变量

```css
:root {
  --my-color-primary: #a8d5ba;
  --my-color-secondary: #d7e8bd;
  --my-color-accent: #fff3c7;
}
```

