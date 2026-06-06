import type { App } from 'vue'
import { vLoading } from './src/directive'
import { createLoading } from './src/service'
import type { LoadingInstance, LoadingOptions } from './src/loading'

export interface LoadingService {
  (options?: LoadingOptions): LoadingInstance
  install: (app: App) => void
}

const service = ((options: LoadingOptions = {}) => createLoading(options)) as LoadingService

service.install = (app: App) => {
  app.directive('loading', vLoading)
  app.config.globalProperties.$loading = service
}

export const MyLoading = service
export { vLoading, createLoading }
export * from './src/loading'
export default MyLoading
