import type { Plugin } from 'vue'
import type { ThemeInput } from '../hooks'

export interface MyUIOptions {
  theme?: ThemeInput
}

declare const MyUI: Plugin<[MyUIOptions?]>

export * from '../components'
export * from '../hooks'
export * from '../locale'
export default MyUI

