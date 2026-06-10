import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import MyUI from '../../../packages/my-ui/full'
import ThemeEditor from './components/ThemeEditor.vue'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(MyUI)
    app.component('ThemeEditor', ThemeEditor)
  },
}

export default theme
