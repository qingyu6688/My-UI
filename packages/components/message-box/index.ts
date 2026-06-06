import type { App } from 'vue'
import { MessageBox } from './src/method'

export const MyMessageBox = MessageBox

export function installMessageBox(app: App): void {
  app.config.globalProperties.$messageBox = MessageBox
  app.config.globalProperties.$alert = MessageBox.alert
  app.config.globalProperties.$confirm = MessageBox.confirm
  app.config.globalProperties.$prompt = MessageBox.prompt
}

export * from './src/message-box'
export { MessageBox }
export default MyMessageBox
