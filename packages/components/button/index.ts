import Button from './src/button.vue'
import ButtonGroup from './src/button-group.vue'
import { withInstall } from '../../utils/install'

export const MyButton = withInstall(Button)
export const MyButtonGroup = withInstall(ButtonGroup)
export default MyButton
export * from './src/button'
