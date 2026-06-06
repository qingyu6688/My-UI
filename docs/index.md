# My UI

My UI 是一个基于 Vue 3、TypeScript、Vite 的前端组件库，默认主题为鼠尾草浅黄。

```ts
import { createApp } from 'vue'
import MyUI from '@qingyu6688/my-ui'
import '@qingyu6688/my-ui/theme-chalk/index.css'

createApp(App).use(MyUI)
```

默认主题色：

| 名称 | 色值 |
| --- | --- |
| 鼠尾草主色 | `#a8d5ba` |
| 浅绿辅助色 | `#d7e8bd` |
| 浅黄强调色 | `#fff3c7` |

