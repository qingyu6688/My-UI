import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import MyUI from '../../../packages/my-ui'
import '../../../packages/theme-chalk/src/index.scss'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(MyUI)
  },
}

export default theme

