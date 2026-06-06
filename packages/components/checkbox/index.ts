import Checkbox from './src/checkbox.vue'
import CheckboxGroup from './src/checkbox-group.vue'
import { withInstall } from '../../utils/install'

export const MyCheckbox = withInstall(Checkbox)
export const MyCheckboxGroup = withInstall(CheckboxGroup)
export default MyCheckbox
export * from './src/checkbox'
