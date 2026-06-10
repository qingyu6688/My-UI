import type { App } from 'vue'
import { Notification } from './src/method'

export const MyNotification = Notification

export function installNotification(app: App): void {
  app.config.globalProperties.$notification = Notification
}

export * from './src/notification'
export { Notification }
export default MyNotification
