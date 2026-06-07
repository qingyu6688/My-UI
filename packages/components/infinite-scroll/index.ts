import type { App } from 'vue'
import { vInfiniteScroll } from './src/infinite-scroll'

export const MyInfiniteScroll = {
  install(app: App): void {
    app.directive('infinite-scroll', vInfiniteScroll)
  },
}

export { vInfiniteScroll }
export default MyInfiniteScroll
