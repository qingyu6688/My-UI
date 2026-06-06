import type { App } from 'vue'
import { Message } from './src/method'

export const MyMessage = Message

export function installMessage(app: App): void {
  app.config.globalProperties.$message = Message
}

export * from './src/message'
export { Message }
export default MyMessage
