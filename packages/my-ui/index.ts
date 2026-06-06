import type { App, Plugin } from 'vue'
import { MyButton } from '../components'
import { applyTheme, createTheme, defaultThemeInput, type ThemeInput } from '../hooks'
import '../theme-chalk/src/index.scss'

export interface MyUIOptions {
  theme?: ThemeInput
}

const components = [MyButton] as const

const MyUI: Plugin<[MyUIOptions?]> = {
  install(app: App, options: MyUIOptions = {}) {
    components.forEach((component) => {
      app.use(component)
    })

    applyTheme(createTheme(options.theme ?? defaultThemeInput))
  },
}

export * from '../components'
export * from '../hooks'
export * from '../locale'
export default MyUI

