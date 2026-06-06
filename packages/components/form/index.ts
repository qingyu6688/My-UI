import Form from './src/form.vue'
import FormItem from './src/form-item.vue'
import { withInstall } from '../../utils/install'

export const MyForm = withInstall(Form)
export const MyFormItem = withInstall(FormItem)
export default MyForm
export * from './src/form'
