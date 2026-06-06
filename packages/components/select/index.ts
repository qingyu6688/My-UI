import Select from './src/select.vue'
import Option from './src/option.vue'
import { withInstall } from '../../utils/install'

export const MySelect = withInstall(Select)
export const MyOption = withInstall(Option)
export default MySelect
export * from './src/select'
